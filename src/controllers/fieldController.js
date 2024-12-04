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
      const { id } = req.params;
      const { nama, harga, lokasi, jenis_lantai, fasilitas, delete_img } = req.body;
      const newImages = req.files; 
  
      let field = await Field.findById(id);
      if (!field) {
        return res.status(404).json({
          success: false,
          message: "Field tidak ditemukan",
          data: {}
        });
      }
  
      if (!Array.isArray(field.img)) {
        field.img = [];
      }
  
      let uploadedImageUrls = [];
      if (newImages && newImages.length > 0) {
        uploadedImageUrls = await imageUpload(newImages);
      }
  
      if (delete_img && Array.isArray(delete_img)) {
        for (let idx of delete_img) {
          const imgUrl = field.img[idx];
          if (imgUrl) {
            const publicId = imgUrl.split('/').pop().split('.')[0]; 
          }
        }
  
        field.img = field.img.filter((_, idx) => !delete_img.includes(idx));
      }
  
      field.nama = nama || field.nama;
      field.harga = harga || field.harga;
      field.lokasi = lokasi || field.lokasi;
      field.jenis_lantai = jenis_lantai || field.jenis_lantai;
      field.fasilitas = fasilitas || field.fasilitas;
      field.img = [...field.img, ...uploadedImageUrls];
  
      await field.save();
  
      return res.status(200).json({
        success: true,
        message: "Berhasil memperbarui field",
        data: {
          nama: field.nama,
          img: field.img,
          harga: field.harga,
          lokasi: field.lokasi,
          jenis_lantai: field.jenis_lantai,
          fasilitas: field.fasilitas
        }
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Gagal memperbarui field",
        data: {}
      });
    }
  },
  
  async addField(req, res, next) {
    try {
      const { nama, harga, lokasi, jenis_lantai, fasilitas } = req.body;  
      const newImages = req.files;  
      if (!nama || !harga || !lokasi || !jenis_lantai || !fasilitas) {
        return res.status(400).json({
          success: false,
          message: "Semua field harus diisi.",
          data: {}
        });
      }
  
      const parsedFasilitas = Array.isArray(fasilitas) ? fasilitas : [fasilitas];
  
      const parsedHarga = parseFloat(harga); 
      if (isNaN(parsedHarga)) {
        return res.status(400).json({
          success: false,
          message: "Harga harus berupa angka.",
          data: {}
        });
      }
  
      let uploadedImageUrls = [];
      if (Array.isArray(newImages)) {
        uploadedImageUrls = await Promise.all(newImages.map(async (file) => {
          const uploadedUrl = await imageUpload(file);  
          return uploadedUrl;  
        }));
      } else if (newImages) {
        uploadedImageUrls.push(await imageUpload(newImages));
      }
  
      const newField = new Field({
        name: nama,
        price: parsedHarga, 
        location: lokasi, 
        floor_type: jenis_lantai, 
        facility: parsedFasilitas,  
        img_url: uploadedImageUrls,  
      });

      await newField.save();
  
      return res.status(201).json({
        success: true,
        message: "Field berhasil ditambahkan.",
        data: {
          nama: newField.name,
          img: newField.img_url,
          harga: newField.price,
          locasi: newField.location,
          jenis_lantai: newField.floor_type,
          fasilitas: newField.facility
        }
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Gagal menambahkan field.",
        data: {}
      });
    }
  },
}

module.exports = fieldController