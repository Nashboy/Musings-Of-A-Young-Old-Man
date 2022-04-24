const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');
console.log("PATH: " + path);


// And then store your public folder path inside a variable.
// let initial_path = path.join(__dirname, "Musings\ of\ a\ YOM");   NORMAL NETWORK
// Functional Path BELOW (starting from js folder)
let initial_path = path.join(__dirname, "../");
console.log ("DIRNAME" + __dirname);
console.log ("INITIAL PATH: " + initial_path);
console.log("INDEX PATH: " + path.join(initial_path, "index.html"))
console.log("EDITOR PATH: " + path.join(initial_path, "postBuild.html"))

// After that create expressJS server.
// And set public folder path to static path.
// Also use app.use(fileupload()) to enable file uploads.
const app = express();
app.use(express.static(initial_path));
app.use(fileupload());
// console.log("APP: " + app);

// After this make a home route and in response send home.html file.
// And run your server on 3000 port.
app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "index.html"));
    // alert("Moving to Index.......");
})

app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial_path, "postBuild.html"));
})

app.get("/:blog", (req, res) => {
    res.sendFile(path.join(initial_path, "displayPost.html"));
})

app.listen("3000", () => {
    console.log('listening......');
})

// Post Images

app.post('/upload', (req, res) => {
    console.log("\n UPLOADING IN HERE PRICK");
    let file = req.files.image;
    let date = new Date();
    // image name
    let imagename = date.getDate() + date.getTime() + file.name;
    // image upload path
    let path = initial_path + 'uploads/' + imagename;
    // let pwd = "/Users/Nash/Desktop/CODING PROJECTS/Personal Projects PRO/Musings of a YOM/uploads"
    // let path = 'Musings\ of\ a\ YOM/uploads/' + imagename;
    console.log("UPLOAD PATH: " + path);
    // console.log((pwd === path));
    // create upload
    file.mv(path, (err, result) => {
        if(err){
            throw err;
        } else{
            // our image upload path
            res.json(`uploads/${imagename}`)
        }
    })
})

// /Users/Nash/Desktop/CODING PROJECTS/Personal Projects PRO/Musings of a YOM/uploads

// Run your server by 'npm start'
