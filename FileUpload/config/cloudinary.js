const cloudinary = require('cloudinary').v2;
require("dotenv").config();

const cloudinaryConnect = () => {
    try {
        cloudinary.config(
            {
                cloud_name: process.env.CLOUD_NAME, 
                api_key: process.env.CLOUD_API, 
                api_secret: process.env.API_SECRET
            }
        );

        console.log("Cloudinary connection established...");

    } catch(err) {
        console.error(err);
        console.log("Error while connecting with the Cloudinary");
    }
}


module.exports = cloudinaryConnect;