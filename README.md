# Installation

In the root directory:

`npm install`
- to install the modules for the front-end React app

`cd server && npm install`
- to go into the server directory and install the modules for the back-end Express server

# Starting the app

You'll want two termainal windows open.

In terminal #1, in the root directory:

`npm start`
- to start the front-end React app
- this will open a browser window to http://localhost:3000/

In terminal #2:

`cd server && node server.js`
- to go into the server directory and start the back-end Express server
- messages from the server will be logged to the terminal

# Usage

- Observe the generation of an LED grid pattern on the front-end React app.
- Observe the generation/saving of .png files of the LED grid pattern.
  - These are intended to be used later for training an ML model to recognize which LEDs are "on" vs "off".

# Credit / Notes

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- It uses Express as the back-end server [Express](https://expressjs.com/).
