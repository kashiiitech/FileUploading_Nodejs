const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

// localFileUpload handler

exports.localFileUpload = async (req, res) => {
    try {

        // fetch file
        const file = req.files.file;
        console.log("File aaw gayi JEE -->  ", file);
        // path in the local server where you will store the file
        const path = __dirname + "/kashuu/" + Date.now() + `${file.name.split(".")[1]}`;
        console.log("PATH -->  ", path);
        // move function is important for file uploading in the local server
        file.mv(path, (err) => {
            console.log(err);
        });

        res.json({
            success: true,
            message: "Local File uploaded successfully",
        });

        
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error while local File Upload"
        });
    }
}


// function to check whether the type of the file is supported or not
function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);   
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = {folder};

    if(quality) {
        options.quality = quality;
    }

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// image upload handler
exports.imageUpload = async(req, res) => {
    try {
        // fetch data
        const {name, tags, email} = req.body;
        console.log(name, email, tags);

        const file = req.files.imageFile;
        console.log(file);

        // validation 
        const supportedTypes = ["jpeg", "png", "jpg"];
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log(fileType);

        if(isFileTypeSupported(fileType, supportedTypes)) {
            // the file is supported
                const response = await uploadFileToCloudinary(file, "kashiiitech");
                console.log(response);

                // create entry in the database
                const fileData = await File.create({
                    name,
                    tags,
                    email,
                    imageUrl: response.secure_url,
                });
                console.log("Entry created in db");

                return res.status(200).json({
                    success: true,
                    message: "Image successfully uploaded.",
                })
        } else {
            // file type is not suppoted
            return res.status(401).json({
                success: false,
                message: "File type is not supported",
            })
        }
        

    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "Error while uploading the image",
        })
    }
}


// upload the video to the media server and add the url in the database
// exports.videoUpload = async (req, res) => {
//     try {
//         // fetch data
//         const {name, tags, email} = req.body;
//         console.log(name, tags, email);
//         // video file fetch
//         const file = req.files.videoFile;
//         console.log("FILE__>  ", file);
//         // validation
//         const supportedTypes = ["mp4", "mov"];
//         const fileType = file.name.split(".").slice(-1)[0];
//         console.log(fileType);

//         if(!isFileTypeSupported(fileType, supportedTypes)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "File format not supported",
//             })
//         };

//         // file format supported upload it to the cloudnary
//         const response = await uploadFileToCloudinary(file, "kashiiitech");
//         console.log("Response -->> ", response );
//         // entry in the database
//         const fileData = await File.create({
//             name,
//             email,
//             tags,
//             imageUrl: response.secure_url
//         });

//         res.json({
//             success: true,
//             imageUrl: response.secure_url,
//             message: "Video successfully uploaded",
//         })

//     } catch(err) {
//         return res.status(500).json({
//             success: false,
//             message: "Error while uploading the video"
//         })
//     }
// }

exports.videoUpload = async (req, res) => {
    try {
        // data fetch
        const { name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        // validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split(".").slice(-1)[0];
        console.log(fileType)

        const fileSizeLimit = 5 * 1024 * 1024;

        // TODO: add a upper limit of 5MB for videos
        if(!(isFileTypeSupported(fileType, supportedTypes))) {
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            })
        }

         // file format supported then upload it to the cloudinary
         const response = await uploadFileToCloudinary(file, "kashiiitech");
         console.log("RESPONSE",response);
         // entry in DataBase
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Video Successfully Uploaded",
        })


    }catch(error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong while uploading video",
        })
    }
}