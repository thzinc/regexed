#!/bin/bash
set -euo pipefail

SOURCE_IMAGE=${1:-assets/logo-large.png}
BACKGROUND="#8940e3"

magick "$SOURCE_IMAGE" -background "$BACKGROUND" -flatten -resize 512x512 assets/android-chrome-512x512.png
magick "$SOURCE_IMAGE" -background "$BACKGROUND" -flatten -resize 192x192 assets/android-chrome-192x192.png
magick "$SOURCE_IMAGE" -background "$BACKGROUND" -flatten -resize 180x180 assets/apple-touch-icon.png
magick "$SOURCE_IMAGE" -background "$BACKGROUND" -flatten -resize 16x16 assets/favicon-16x16.png
magick "$SOURCE_IMAGE" -background "$BACKGROUND" -flatten -resize 32x32 assets/favicon-32x32.png
