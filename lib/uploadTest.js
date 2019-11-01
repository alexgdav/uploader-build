// require file system
const fs = require('fs')
// require aws sdk
const AWS = require('aws-sdk')
// set aws region
AWS.config.update({region: 'us-east-1'})
// create s3 object instance
const s3 = new AWS.S3()
console.log(s3)

/* access command line arguments */

// save filepath to file to be processed to a variable
const filePath = process.argv[2]

// read the file first
fs.readFile(filePath, (err, data) => {
  if (err) throw err
  console.log(data)
})
