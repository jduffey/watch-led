const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

/*
Limit the number of images saved to prevent accidentally bloating
the file system if we forget to terminate the server
*/
const imageCountLimit = 100;

app.post('/save-image', express.json(), (req, res) => {
    console.log('Endpoint /save-image called');
    const image = req.body.image;
    const fileName = req.body.unixTimestamp + '.png';
    const imagesDirectoryName = 'images';
    const filePath = path.join(__dirname, imagesDirectoryName, fileName);

    fs.readdir(path.join(__dirname, 'images'), (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving image');
        } else {
            const filesInImagesDirectory = files.length;
            console.log(`Number of files in ${imagesDirectoryName} directory: ` + filesInImagesDirectory);
            if (filesInImagesDirectory < imageCountLimit) {
                fs.writeFile(filePath, image, 'base64', (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('Error saving image');
                    } else {
                        res.send('Image saved successfully: ' + fileName);
                        console.log('Image saved successfully: ' + fileName);
                    }
                });
            } else {
                res.status(500).send('Image limit reached - image not saved');
                console.log(`Image limit (${imageCountLimit}) reached - image not saved`);
            }
        }
    });
});
