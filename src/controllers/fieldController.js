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

      if(delete_img) {
        field.img_url = field.img_url.filter((e, idx) => !delete_img.includes(idx))
      }

      if(newImages && newImages.length !== 0) {
        const uploadImgUrl = []
        for(const img of newImages) {
          const url = await imageUpload(img)
          uploadImgUrl.push(url)
        }
        field.img_url = [...field.img_url, ...uploadImgUrl]
      }

      let newFacility = field.facility
      if(fasilitas) {
        newFacility = fasilitas.split(",").map(e => e.trim())
      }
      field.name = nama || field.name;
      field.price = harga || field.price;
      field.location = lokasi || field.location;
      field.floor_type = jenis_lantai || field.floor_type;
      field.facility = newFacility

      await field.save();
  
      return res.status(200).json({
        success: true,
        message: "Berhasil memperbarui field",
        data: {
          nama: field.name,
          img: field.img_url,
          harga: field.price,
          lokasi: field.location,
          jenis_lantai: field.floor_type,
          fasilitas: field.facility
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
      // validasi
      const { nama, harga, lokasi, jenis_lantai, fasilitas } = req.body;  
      const newImages = req.files;  
      if (!nama || !harga || !lokasi || !jenis_lantai || !fasilitas || !newImages) {
        return res.status(400).json({
          success: false,
          message: "Semua field harus diisi.",
          data: {}
        });
      }
      if(newImages.length === 0) {
        return ResponseAPI.error(res, 'Photo harus diisi')
      }

      // parse
      const parsedFasilitas = fasilitas.split(",").map(e => e.trim())
      const parsedHarga = parseFloat(harga); 
      if (isNaN(parsedHarga)) {
        return res.status(400).json({
          success: false,
          message: "Harga harus berupa angka.",
          data: {}
        });
      }

      // upload
      const uploadImgUrl = []
      for(const img of newImages) {
        const url = await imageUpload(img)
        uploadImgUrl.push(url)
      }
      
      // add field
      const newField = await Field.create({
        name: nama,
        price: parsedHarga, 
        location: lokasi, 
        floor_type: jenis_lantai, 
        facility: parsedFasilitas,  
        img_url: uploadImgUrl,  
      });
      
      // response
      return res.status(201).json({
        success: true,
        message: "Field berhasil ditambahkan.",
        data: {
          nama: newField.name,
          img: newField.img_url,
          harga: newField.price,
          lokasi: newField.location,
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