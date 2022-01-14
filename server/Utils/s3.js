import AWS from "aws-sdk";

const s3Bucket = new AWS.S3({
    accessKeyId: "",
    secretAccessKey: "",
    region: "ap-south-1",
});

export const s3Upload = (options) => {
    return new Promise((resolve, reject) =>
        s3Bucket.listMultipartUploads(options, (error, data) => {/*options- is a props ..lateron we upload the s3upload function thn pass s3Bucket object as a parameter rn we are consider as a options only ,,,, data- what o/p u r recieve or what u r o/p u get  */
            if (error) return reject(error);
            return resolve(data);
        })
    );
};