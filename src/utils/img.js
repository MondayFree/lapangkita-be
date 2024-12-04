const fs = require('fs');
const initCloudinary = require('../config/cloudinary');

const imageUpload = async (reqFiles) => {
  const cld = initCloudinary();
  try {
    const uploadPromises = reqFiles.map(file => cld.uploader.upload(file.path)); 
    const uploadResults = await Promise.all(uploadPromises);
    reqFiles.forEach(file => fs.unlinkSync(file.path));
    return uploadResults.map(result => result.secure_url);
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = imageUpload;