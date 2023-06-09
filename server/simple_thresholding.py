from flask import Flask, render_template
import cv2
import base64

app = Flask(__name__)


@app.route('/')
def home():
    image_files = [
        'images/1686316344.png',
        'images/1686316349.png',
        'images/1686316354.png',
        'images/1686316359.png',
        'images/1686316364.png',
    ]

    all_images = []

    # Loop over image files
    for image_path in image_files:
        image = cv2.imread(image_path)

        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        blurred = cv2.GaussianBlur(gray, (7, 7), 0)

        images = []

        # Loop over thresholds
        for threshold in range(127, 256, 16):
            _, threshInv = cv2.threshold(
                blurred, threshold, 255, cv2.THRESH_BINARY_INV)
            output = cv2.bitwise_and(image, image, mask=threshInv)

            # Encode image as base64
            _, buffer = cv2.imencode('.jpg', output)
            base64_image = base64.b64encode(buffer).decode('utf-8')

            # Append to the list of images
            images.append((threshold, base64_image))

        all_images.append(images)

    # Generate simple website as a multi-line string
    html = "<html><body>"

    for images in all_images:
        html += '<div style="display: flex; flex-wrap: wrap;">'
        for threshold, image in images:
            html += f'<div style="margin: 10px;">'
            html += f'<p>Threshold: {threshold}</p>'
            html += f'<img src="data:image/jpeg;base64, {image}" alt="Image" />'
            html += '</div>'
        html += '</div><br><br>'

    html += "</body></html>"

    return html


if __name__ == "__main__":
    app.run(debug=True)
