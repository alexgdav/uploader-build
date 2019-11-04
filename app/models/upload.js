const mongoose = require('mongoose')
require('dotenv').config()

const uploadSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},

{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

// virtual property that generates the file URL
uploadSchema.virtual('fileUrl').get(function () {
  // generate value
  const url = 'https://' + process.env.BUCKET_NAME + '.s3.amazonaws.com/' + this.fileName
  // return value
  return url
})

module.exports = mongoose.model('Upload', uploadSchema)
