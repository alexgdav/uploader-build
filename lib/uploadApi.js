require('dotenv').config()

// require mime-types package
// const mime = require('mime-types')
// require aws sdk
const AWS = require('aws-sdk')
// set aws region
AWS.config.update({
  region: 'us-east-1'
})
// create s3 object instance
const s3 = new AWS.S3()

// define bucket based on environment variable
const bucketName = process.env.BUCKET_NAME
module.exports = function (file) {
  return new Promise((resolve, reject) => {
  // create params object for s3 upload
    const params = {
      Bucket: bucketName,
      Key: `${Date.now()}_${file.originalname}`,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype

    }
    // upload to s3
    s3.upload(params, (err, s3Data) => {
      if (err) throw err
      console.log(s3Data)
    })
  })
}
