const Field = require('../models/Field');
const ResponseAPI = require('../utils/response');
const imageUpload = require('../utils/img')

const fieldController = { 
  async getAllField(req, res, next) {
    try {
      const result = await Field.find();

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Gagal mendapatkan list lapang",
          data: {}
        });
      }

      const responseData = result.map(field => ({
        id: field._id,
        nama: field.name,
        img_url: field.img_url,  
        lokasi: field.location,
        harga: field.price,
      }));

      return res.status(200).json({
        success: true,
        message: "Berhasil mendapatkan list lapang",
        data: responseData
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Gagal mendapatkan list lapang",
        data: {}
      });
    }
  },

  
  async getDetailField(req, res, next) {
    try {
      const { id } = req.params;
      const field = await Field.findById(id);
      
      if (!field) {
        return res.status(404).json({
          success: false,
          message: "Field tidak ditemukan",
          data: {}
        });
      }

      const responseData = {
        id: field._id,
        nama: field.name,
        img_url: field.img_url,  
        harga: field.price,
        lokasi: field.location,
        jenis_lantai: field.floor_type,
        fasilitas: field.facility,  
      };

      return res.status(200).json({
        success: true,
        message: "Berhasil mendapatkan detail lapangan",
        data: responseData
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Gagal mendapatkan detail lapangan",
        data: {}
      });
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