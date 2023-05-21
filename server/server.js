const express = require('express');
const app = express();
const port = 3001;  // or whichever port you prefer

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

const fs = require('fs');
const path = require('path');

app.post('/save-image', express.json(), (req, res) => {
    const image = req.body.image;
    const fileName = Date.now() + '.png';
    const filePath = path.join(__dirname, 'images', fileName);

    fs.writeFile(filePath, image, 'base64', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving image');
        } else {
            res.send('Image saved successfully');
        }
    });
});
