const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3001;

const IMAGES_DIRECTORY_NAME = 'images';
const IMAGE_COUNT_LIMIT = 100;
const ERROR_STATUS_CODE = 500;
const IMAGES_DIRECTORY_PATH = path.join(__dirname, IMAGES_DIRECTORY_NAME);

app.use(cors());

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

const createDirectory = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

const countFiles = (dirPath) => {
    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files.length);
            }
        });
    });
}

const saveImage = (filePath, image) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, image, 'base64', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve('   ✅ Image saved successfully: ' + path.basename(filePath));
            }
        });
    });
}

const saveImageEndpoint = '/save-image';

app.post(saveImageEndpoint, express.json(), async (req, res) => {
    console.log(`➡️  POST ${saveImageEndpoint} called`);
    const image = req.body.image;
    const fileName = req.body.unixTimestamp + '.png';
    const filePath = path.join(IMAGES_DIRECTORY_PATH, fileName);

    try {
        createDirectory(IMAGES_DIRECTORY_PATH);

        const imageCount = await countFiles(IMAGES_DIRECTORY_PATH);
        console.log(`   🔢 Image count: ${imageCount}`);

        if (imageCount >= IMAGE_COUNT_LIMIT) {
            res.status(ERROR_STATUS_CODE).send('Image limit reached - image not saved');
            console.error(`   ❌ Image limit (${IMAGE_COUNT_LIMIT}) reached - image not saved`);
            return;
        }

        const message = await saveImage(filePath, image);
        res.send(message);
        console.log(message);
    } catch (error) {
        res.status(ERROR_STATUS_CODE).send('Error: ' + error.message);
        console.error('   ❌ Error:', error);
    }
});
