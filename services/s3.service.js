const S3 = require('aws-sdk/clients/s3');
const path = require('path');
const uuid = require('uuid').v4;

const {config} = require("../configs");

const BucketConfig = new S3({
    region: config.AWS_S3_REGION,
    secretAccessKey: config.AWS_S3_SECRET_KEY,
    accessKeyId: config.AWS_S3_ACCESS_KEY,
});

module.exports = {
    uploadFile: async (file, itemType, itemId) => {
        const Key = _buildFilePath(file.name, itemType, itemId);

        return BucketConfig
            .upload({
                Bucket: config.AWS_S3_BUCKET,
                Key,
                // Key: file.name,
                ContentType: file.mimetype,
                ACL: "public-read",
                Body: file.data
            })
            .promise();
    },

    updateFile: async (file, fileURL) => {
        const path = fileURL.split(config.AWS_S3_BUCKET_URL).pop();

        return BucketConfig
            .putObject({
                Bucket: config.AWS_S3_BUCKET,
                Key: path,
                ContentType: file.mimetype,
                ACL: "public-read",
                Body: file.data
            })
            .promise();
    },

    deleteFile: async (fileURL) => {
        const path = fileURL.split(config.AWS_S3_BUCKET_URL).pop();

        return BucketConfig
            .deleteObject({
                Bucket: config.AWS_S3_BUCKET,
                Key: path,
            })
            .promise();
    },
};

function _buildFilePath(fileName, itemType, itemId) {
    const ext1 = fileName.split('.').pop(); // jpg
    const ext2 = path.extname(fileName);    // .jpg

    return `${itemType}/${itemId}/${uuid()}.${ext1}`;
    // return `${itemType}/${itemId}/${Date.now()}${ext2}`;
}
