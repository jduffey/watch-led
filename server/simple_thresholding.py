from flask import Flask, render_template
import cv2
import base64
import os
from io import BytesIO

app = Flask(__name__)


@app.route('/')
def home():
    image_path = 'images/1686316695.png'
    image = cv2.imread(image_path)

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (7, 7), 0)

    images = []

    # Loop over thresholds
    for threshold in range(0, 256, 32):
        _, threshInv = cv2.threshold(
            blurred, threshold, 255, cv2.THRESH_BINARY_INV)
        output = cv2.bitwise_and(image, image, mask=threshInv)

        # Encode image as base64
        _, buffer = cv2.imencode('.jpg', output)
        base64_image = base64.b64encode(buffer).decode('utf-8')

        # Append to the list of images
        images.append((threshold, base64_image))

    # Generate simple website as a multi-line string
    html = "<html><body>"
    html += '<div style="display: flex; flex-wrap: wrap;">'
    for threshold, image in images:
        html += f'<div style="margin: 10px;">'
        html += f'<p>Threshold: {threshold}</p>'
        html += f'<img src="data:image/jpeg;base64, {image}" alt="Image" />'
        html += '</div>'
    html += '</div>'
    html += "</body></html>"

    return html


if __name__ == "__main__":
    app.run(debug=True)
