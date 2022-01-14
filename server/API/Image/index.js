import express from "express";
import AWS from "aws-sdk";
import multer from "multer";
import { ImageModel } from "../../database/allModels";
import { s3Upload } from "../../Utils/s3";

const Router = express.Router();

// MULTER CONFIG
const storage = multer.memoryStorage();
const upload = multer({ storage });



/*
Route        /
Des          Uploading the given img to AWS S3 buckets and then saving the file to mongoDB 
Params       NONE
Access       Public
Method       POST 
*/

Router.post("/", upload.single("file"), async (req, res) => {
    try {
        const file = req.file;
        const bucketOptions = {
            Bucket: "shapeaioctoberbatch2021",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read"
        };
        const uploadImage = await s3Upload(bucketOptions);

        return res.status(200).json({ uploadImage });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;