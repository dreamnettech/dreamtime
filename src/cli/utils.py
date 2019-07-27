import cv2
import math

desired_size = 512


def resize_input(img):
    old_size = img.shape[:2]
    ratio = float(desired_size)/max(old_size)
    new_size = tuple([int(x*ratio) for x in old_size])

    img = cv2.resize(img, (new_size[1], new_size[0]))

    delta_w = desired_size - new_size[1]
    delta_h = desired_size - new_size[0]
    top, bottom = delta_h//2, delta_h-(delta_h//2)
    left, right = delta_w//2, delta_w-(delta_w//2)

    return cv2.copyMakeBorder(img, top, bottom, left, right, cv2.BORDER_CONSTANT, value=[255, 255, 255])


def resize_crop_input(img):
    old_size = img.shape[:2]
    ratio = float(desired_size)/min(old_size)
    new_size = tuple([int(x*ratio) for x in old_size])

    img = cv2.resize(img, (new_size[1], new_size[0]))

    delta_w = new_size[1] - desired_size
    delta_h = new_size[0] - desired_size
    top = delta_h//2
    left = delta_w//2

    return img[top:desired_size+top, left:desired_size+left]


def rescale_input(img):
    return cv2.resize(img, (desired_size, desired_size))

