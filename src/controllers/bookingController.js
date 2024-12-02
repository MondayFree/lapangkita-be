const Booking = require('../models/Booking');
const ResponseAPI = require('../utils/response');

const bookingController = {
  async addBooking(req, res, next) {
    try {
      let {id_lapang, tanggal, jam, metode_pembayaran} = req.body 
      if(!id_lapang || !tanggal || !jam || !metode_pembayaran) {
        return ResponseAPI.error(res, 'Input is not valid', 400)
      }
      const checkFieldId = id_lapang.length < 12
      const regexDate = /^\d{2}-\d{2}-\d{4}$/;
      const checkTanggal = !(regexDate.test(tanggal))
      const regexTime = /^(1?[0-9]|2[0-4])$/;
      jam = jam.trim()
      const checkJam = !(regexTime.test(jam))
      const checkMetodePembayaran = !(metode_pembayaran === 'bayar_lokasi' || metode_pembayaran === 'bayar_online')
      if(checkFieldId || checkTanggal || checkJam || checkMetodePembayaran) {
          return ResponseAPI.error(res, 'Input value is not valid', 400)
      }
      const userId = req.user._id;
      tanggal = tanggal.split('-')
      const jadwal = new Date(Date.UTC(tanggal[2], tanggal[1] - 1, tanggal[0], jam))
      const existingSchedule = await Booking.findOne({
        play_time: jadwal
      })
      if(existingSchedule) {
        return ResponseAPI.error(res, 'Booking already exists')
      }      
      const result = await Booking.create({
        user_id: userId,
        field_id: id_lapang,
        booking_time: Date.now(),
        play_time: jadwal,
        payment_status: metode_pembayaran === 'bayar_lokasi' ? 'PENDING' : 'COMPLETED',
        payment_method: metode_pembayaran.toUpperCase()
      })
      return ResponseAPI.success(res, {
        booking_id: result._id,
        field_id: result.field_id,
        booking_time: result.booking_time,
        play_time: result.play_time
      })
    } catch (error) {
        next(error);
    }
  },
  
  async getAllBooking(req, res, next) {
    try {
            
    } catch (error) {
        next(error);
    }
  },
 
  async getUserBooking(req, res, next) {
    try {
            
    } catch (error) {
        next(error);
    }
  },
  
  async getDetailBooking(req, res, next) {
    try {
            
    } catch (error) {
        next(error);
    }
  },
  
  async updateStatusBooking(req, res, next) {
    try {
            
    } catch (error) {
        next(error);
    }
  },
}

module.exports = bookingController