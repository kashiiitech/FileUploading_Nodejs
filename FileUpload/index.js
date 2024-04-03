const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8000;

app.use(express.json());

const fileUpload = require('express-fileupload');
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// listen on the port

app.listen(PORT, () => {
    console.log(`The server is listening on the PORT ${PORT}`);
})

// routes
const routes = require("./routes/FileUpload");
app.use("/api/v1/upload", routes);
// database connection
const connectDB = require("./config/database");
connectDB();

// cloudinary connection
const cloudinaryConnect = require("./config/cloudinary");
cloudinaryConnect();
// default route
app.get("/", (req, res) => {
    res.send(`<h1>This is a web app for Media upload on the Server with Database</h1>`)
})