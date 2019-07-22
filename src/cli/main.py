import shutil
import sys
import argparse
import tempfile

import cv2
import time

import os
from run import process, process_gif
from multiprocessing import freeze_support
import imageio

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
parser.add_argument(
    "--cpu",
    default=False,
    action="store_true",
    help="force photo processing with CPU (slower)",
)
parser.add_argument(
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
    "--gif",
    action="store_true",
    default=False,
    help="Run the processing on a gif",
)
args = parser.parse_args()

"""
main.py

 How to run:
 python3 main.py

"""

# ------------------------------------------------- main()
def main():
    start = time.time()

    gpu_ids = args.gpu

    if args.cpu:
        gpu_ids = None
    elif gpu_ids is None:
        gpu_ids = [0]

    if not args.gif:
        # Read input image
        image = cv2.imread(args.input)

        #Check that image loaded
        if image is None:
            sys.exit("Failed to load image " + args.input)

        # Process
        result = process(image, gpu_ids, args.enablepubes)

        # Write output image
        cv2.imwrite(args.output, result)
    else:
        gif_imgs = imageio.mimread(args.input)
        nums = len(gif_imgs)
        print("Total {} frames in the gif!".format(nums))
        tmp_dir = tempfile.mkdtemp()
        process_gif(gif_imgs, gpu_ids, args.enablepubes, tmp_dir)
        print("Creating gif")
        imageio.mimsave(args.output if args.output != "output.png" else "output.gif",
                        [imageio.imread(os.path.join(tmp_dir, "output_{}.jpg".format(i))) for i in range(nums)])
        shutil.rmtree(tmp_dir)

    end = time.time()
    duration = end - start

    # Done
    print("Done! We have taken", round(duration, 2), "seconds")

    # Exit
    sys.exit()


if __name__ == "__main__":
    freeze_support()
    main()
