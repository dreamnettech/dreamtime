import re
import shutil
import sys
import argparse
import tempfile
import cv2
import time
import os
import imageio
import sentry_sdk
import rook
import utils

from run import process, process_gif
from multiprocessing import freeze_support
from multiprocessing.pool import ThreadPool
from dotenv import load_dotenv

#
load_dotenv()

parser = argparse.ArgumentParser()
parser.add_argument(
    "-i", "--input", default="input.png", help="path of the photo to transform"
)
parser.add_argument(
    "-o",
    "--output",
    default="output.png",
    help="path where the transformed photo will be saved. (default: output.png or output.gif)",
)
processing_mod = parser.add_mutually_exclusive_group()
processing_mod.add_argument(
    "--cpu",
    default=False,
    action="store_true",
    help="force photo processing with CPU (slower)",
)
processing_mod.add_argument(
    "--gpu",
    action="append",
    type=int,
    help="ID of the GPU to use for processing. It can be used multiple times to specify multiple GPUs (Example: --gpu 0 --gpu 1 --gpu 2) This argument will be ignored if --cpu is active. (default: 0)",
)
parser.add_argument(
    "--enablepubes",
    action="store_true",
    default=False,
    help="generates pubic hair on output image",
)
parser.add_argument(
    "--gif", action="store_true", default=False, help="run the processing on a gif"
)
parser.add_argument(
    "-n", "--n_runs", type=int, help="number of times to process input (default: 1)",
)
parser.add_argument(
    "--n_cores", type=int, default=4, help="number of cpu cores to use (default: 4)",
)
scale_mod = parser.add_mutually_exclusive_group()
scale_mod.add_argument(
    "--auto-resize",
    action="store_true",
    default=False,
    help="Scale and pad image to 512x512 (maintains aspect ratio)",
)
scale_mod.add_argument(
    "--auto-resize-crop",
    action="store_true",
    default=False,
    help="Scale and crop image to 512x512 (maintains aspect ratio)",
)
scale_mod.add_argument(
    "--auto-rescale",
    action="store_true",
    default=False,
    help="Scale image to 512x512",
)

def check_crops_coord():
    def type_func(a):
        if not re.match(r"^\d+,\d+:\d+,\d+$", a):
            raise argparse.ArgumentTypeError("Incorrect coordinates format. Valid format is <x_top_left>,<y_top_left>:<x_bot_right>,<x_bot_right>")
        return tuple(int(x) for x in re.findall('\d+', a))
    return type_func

scale_mod.add_argument(
    "--overlay",
    type=check_crops_coord(),
    help="Processing the part of the image given by the coordinates (<x_top_left>,<y_top_left>:<x_bot_right>,<x_bot_right>) and overlay the result on the original image.",
)
args = parser.parse_args()

"""
main.py

 How to run:
 python3 main.py

"""

# ------------------------------------------------- main()
def main():
    if not os.path.isfile(args.input):
        print("Error : {} file doesn't exist".format(args.input), file=sys.stderr)
        exit(1)
    start = time.time()

    gpu_ids = args.gpu

    if args.cpu:
        gpu_ids = None
    elif gpu_ids is None:
        gpu_ids = [0]

    if not args.gif:
        # Read image
        image = cv2.imread(args.input)

        # Preprocess
        if args.overlay :
            original_image = image.copy()
            image = utils.crop_input(image,args.overlay[0],args.overlay[1],args.overlay[2],args.overlay[3])
        elif args.auto_resize:
            image = utils.resize_input(image)
        elif args.auto_resize_crop:
            image = utils.resize_crop_input(image)
        elif args.auto_rescale:
            image = utils.rescale_input(image)

        # Process
        if args.n_runs is None or args.n_runs == 1:
            result = process(image, gpu_ids, args.enablepubes)

            if args.overlay:
                result = utils.overlay_original_img(original_image,result,args.overlay[0],args.overlay[1],args.overlay[2],args.overlay[3])

            cv2.imwrite(args.output, result)
        else:
            base_output_filename = utils.strip_file_extension(args.output, ".png")

            def process_one_image(i):
                result = process(image, gpu_ids, args.enablepubes)

                if args.overlay:
                    result = utils.overlay_original_img(original_image, result, args.overlay[0], args.overlay[1],
                                                        args.overlay[2], args.overlay[3])
                cv2.imwrite(base_output_filename + "%03d.png" % i, result)

            if args.cpu:
                pool = ThreadPool(args.n_cores)
                pool.map(process_one_image, range(args.n_runs))
                pool.close()
                pool.join()
            else:
                for i in range(args.n_runs):
                    process_one_image(i)
    else:
        # Read images
        gif_imgs = imageio.mimread(args.input)
        print("Total {} frames in the gif!".format(len(gif_imgs)))

        # Preprocess
        if args.auto_resize:
            gif_imgs = [utils.resize_input(img) for img in gif_imgs]
        elif args.auto_resize_crop:
            gif_imgs = [utils.resize_crop_input(img) for img in gif_imgs]
        elif args.auto_rescale:
            gif_imgs = [utils.rescale_input(img) for img in gif_imgs]

        # Process
        if args.n_runs is None or args.n_runs == 1:
            process_gif_wrapper(gif_imgs, args.output if args.output != "output.png" else "output.gif", gpu_ids, args.enablepubes, args.n_cores)
        else:
            base_output_filename = utils.strip_file_extension(args.output, ".gif") if args.output != "output.png" else "output"
            for i in range(args.n_runs):
                process_gif_wrapper(gif_imgs, base_output_filename + "%03d.gif" % i, gpu_ids, args.enablepubes, args.n_cores)

    end = time.time()
    duration = end - start

    # Done
    print("Done! We have taken", round(duration, 2), "seconds")

    # Exit
    sys.exit()


def process_gif_wrapper(gif_imgs, filename, gpu_ids, enablepubes, n_cores):
    tmp_dir = tempfile.mkdtemp()
    process_gif(gif_imgs, gpu_ids, enablepubes, tmp_dir, n_cores)
    print("Creating gif")
    imageio.mimsave(
        filename,
        [
            imageio.imread(os.path.join(tmp_dir, "output_{}.jpg".format(i)))
            for i in range(len(gif_imgs))
        ],
    )
    shutil.rmtree(tmp_dir)



def start_sentry():
    dsn = os.getenv("SENTRY_DSN")

    if dsn:
        sentry_sdk.init(dsn=dsn)


def start_rook():
    token = os.getenv("ROOKOUT_TOKEN")

    if token:
        rook.start(token=token)


if __name__ == "__main__":
    freeze_support()
    start_sentry()
    start_rook()
    main()
