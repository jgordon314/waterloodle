'''
Source: ChatGPT (Large Language Model)
Date: 07/03/2026
Prompts: 
- "I have an image with a bunch of black polygons and some multicoloured background. How can I efficiently split this into a separate png (with no background) per polygon, then display that shape in a different colour in an html page"
- "Off to a good start. When I display them, I will want to overlay the coloured shape on top of the original image. How can I make sure the position stays accurate and layer two images on top of each other in html"
'''

import cv2
import numpy as np

img = cv2.imread("betterMap.png")
h, w = img.shape[:2]

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# isolate black borders
_, mask = cv2.threshold(gray, 50, 255, cv2.THRESH_BINARY_INV)

contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

polygons = []

for i, cnt in enumerate(contours):

    # simplify shape
    epsilon = 0.002 * cv2.arcLength(cnt, True)
    approx = cv2.approxPolyDP(cnt, epsilon, True)

    points = [(p[0][0], p[0][1]) for p in approx]
    polygons.append(points)

print("polygons:", len(polygons))

svg = []

svg.append(f'<svg viewBox="0 0 {w} {h}" xmlns="http://www.w3.org/2000/svg">')

# background image
svg.append(f'<image href="map.png" width="{w}" height="{h}" />')

for i, poly in enumerate(polygons):

    points = " ".join(f"{x},{y}" for x,y in poly)

    svg.append(
        f'<polygon id="region_{i}" '
        f'points="{points}" '
        f'class="region" />'
    )

svg.append("</svg>")

with open("map.svg","w") as f:
    f.write("\n".join(svg))