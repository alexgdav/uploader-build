// configure env
require('dotenv').config()

// require file system
const fs = require('fs')
// require aws sdk
const AWS = require('aws-sdk')
// set aws region
AWS.config.update({
  region: 'us-east-1'
})
// create s3 object instance
const s3 = new AWS.S3()
console.log(s3)

/* access command line arguments */

// save filepath to file to be processed to a variable
const filePath = process.argv[2]

// define bucket based on environment variable
const bucketName = process.env.BUCKET_NAME
console.log(bucketName)

// read the file first
fs.readFile(filePath, (err, fileData) => {
  if (err) throw err
  console.log(fileData)

  // create params object for s3 upload
  const params = {
    Bucket: bucketName,
    Key: 'something',
    Body: fileData,
    ACL: 'public-read',
    ContentType: 'image/jpeg'

  }
  // upload to s3
  s3.upload(params, (err, s3Data) => {
    if (err) throw err
    console.log(s3Data)
  })
})
