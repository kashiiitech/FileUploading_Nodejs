const express = require("express");
const router = express.Router();

// importing the handlers from the controllers
const {localFileUpload, imageUpload, videoUpload} = require("../controller/fileUpload");

// defining the API routes
router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);

module.exports = router;