const Field = require('../models/Field');
const ResponseAPI = require('../utils/response');
const imageUpload = require('../utils/img')

const fieldController = {
  async getAllField(req, res, next) {
    try {
            
    } catch (error) {
        next(error);
    }
  },
  
  async getDetailField(req, res, next) {
    try {
            
    } catch (error) {
        next(error);
    }
  },
 
  async updateField(req, res, next) {
    try {

      // kode untuk upload image, bisa dimodifikasi
      for(const file of req.files) {
        const uploadedImgUrl = await imageUpload(file)
        console.log(uploadedImgUrl); // berisi url gambar yang sudah diupload
      }

    } catch (error) {
        next(error);
    }
  },
  
  async addField(req, res, next) {
    try {
            
      // kode untuk upload image, bisa dimodifikasi
      for(const file of req.files) {
        const uploadedImgUrl = await imageUpload(file)
        console.log(uploadedImgUrl); // berisi url gambar yang sudah diupload
      }

    } catch (error) {
        next(error);
    }
  },
}

module.exports = fieldController