const express = require('express');
const app = express();
const port = 3001;  // or whichever port you prefer
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.use(cors());

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


app.post('/save-image', express.json(), (req, res) => {
    console.log('Endpoint /save-image called');
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
