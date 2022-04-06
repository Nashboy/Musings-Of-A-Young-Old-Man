const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');

// And then store your public folder path inside a variable.
let initial_path = path.join(__dirname, "Musings of a YOM");

// After that create expressJS server.
// And set public folder path to static path.
// Also use app.use(fileupload()) to enable file uploads.
const app = express();
app.use(express.static(initial_path));
app.use(fileupload());

// After this make a home route and in response send home.html file.
// And run your server on 3000 port.
app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "index.html"));
})

app.listen("3000", () => {
    console.log('listening......');
})

// Run your server by npm start
