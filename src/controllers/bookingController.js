const Booking = require('../models/Booking');
const ResponseAPI = require('../utils/response');
const { DateTime } = require("luxon");

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
        play_time: jadwal,
        field_id: id_lapang
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
        // validasi param
        let {page, limit, status} = req.query
        if(!page || !limit) {
          return ResponseAPI.error(res, "Pagination is not valid", 400)
        }
        page = Number(page)
        limit = Number(limit)
        if(!page || !limit) {
          return ResponseAPI.error(res, "Pagination value is not valid", 400)
        }
        if(status) {
          if(status !== 'active' && status !== 'passed' && status !== 'pending') {
            return ResponseAPI.error(res, "Status value is not valid", 400)
          }
        }

        // get data from db
        const filter = {}

        if(status) {
          const now = DateTime.now().setZone("Asia/Jakarta");
          let operator = '$lte'
          if(status === 'active') {
            filter.payment_status = 'COMPLETED'
            operator = '$gte'
          } else if(status === 'pending') {
            operator = '$gte'
            filter.payment_status = 'PENDING'
          }
          filter.play_time = {
            [operator]: now
          }
        }

        const result = await Booking.find(filter)
          .limit(limit)
          .skip(limit * (page -1))
          .populate('field_id', 'name img_url')
          .populate('user_id', "first_name _id img_url")
          .sort({ play_time: -1 })

        // pagination
        const totalDocuments = await Booking.countDocuments(filter);
        let totalPage
        if(totalDocuments > limit) {
          totalPage = totalDocuments / limit
          if((totalPage - Math.floor(totalPage)) > 0) {
            totalPage = Math.ceil(totalPage)
          }
        } else {
          totalPage = 1
        }

        // response
        const response = result.map(el => {
          const now = DateTime.now().setZone("Asia/Jakarta");
          const playTime = new Date(el.play_time)

          let bookingStatus = playTime.getTime() > now.toMillis() ? 'active' : 'passed'
          if(el.payment_status === 'PENDING' && bookingStatus === 'active') {
            bookingStatus = 'pending'
          }

          const booking = {
            id: el._id,
            customer: {
              id: el.user_id._id,
              name: el.user_id.first_name,
              imgUrl: el.user_id.img_url
            },
            status: bookingStatus,
            booking_date: el.booking_time,
            play_time: el.play_time,
            field: {
              name: el.field_id.name,
              img_url: el.field_id.img_url,
            }
          }
          return booking
        })
        return ResponseAPI.success(res, {
          page,
          totalPage,
          limit,
          data: response
        })
    } catch (error) {
        next(error);
    }
  },
 
  async getUserBooking(req, res, next) {
    try {
      // validasi param user id
      const {id} = req.params
      if(id.length < 12) {
        return ResponseAPI.error(res, 'User id not valid')
      }

      // validsi param lain
      let {page, limit, status, field_id, order} = req.query
      if(!page || !limit) {
          return ResponseAPI.error(res, "Pagination is not valid", 400)
      }
      page = Number(page)
      limit = Number(limit)
      if(!page || !limit) {
          return ResponseAPI.error(res, "Pagination value is not valid", 400)
      }
      if(status) {
        if(!(status === 'active' || status === 'passed' || status === 'pending')) {
          return ResponseAPI.error(res, 'User status not valid')
        }
      }
      if(field_id) {
        if(field_id.length < 12) {
          return ResponseAPI.error(res, 'Field ID not valid')
        }
      }
      if(order) {
        if(!(order === 'asc' || order === 'desc')) {
          return ResponseAPI.error(res, 'Order is not valid')
        }
      }

      // get data from db
      const filter = {
        user_id: id
      }
      if(status) {
        // 
        const now = DateTime.now().setZone("Asia/Jakarta");
        let operator = '$lte'
        if(status === 'active') {
          filter.payment_status = 'COMPLETED'
          operator = '$gte'
        } else if(status === 'pending') {
          operator = '$gte'
          filter.payment_status = 'PENDING'
        }
        filter.play_time = {
          [operator]: now
        }
      }
      if(field_id) {
        filter.field_id = field_id
      }
      const result = await Booking.find(filter)
        .limit(limit)
        .skip(limit * (page - 1))
        .sort({
          play_time: order ? order === 'asc' ? 1 : -1 : -1
        })
        .populate('field_id', 'name img_url')
        
      // pagination
      const totalDocuments = await Booking.countDocuments(filter);
      let totalPage
      if(totalDocuments > limit) {
        totalPage = totalDocuments / limit
        if((totalPage - Math.floor(totalPage)) > 0) {
          totalPage = Math.ceil(totalPage)
        }
      } else {
        totalPage = 1
      }

      // response
      const parsedResult = result.map(el => {
        const now = DateTime.now().setZone("Asia/Jakarta");
        const playTime = new Date(el.play_time)
        let bookingStatus = playTime.getTime() > now.toMillis() ? 'active' : 'passed'
        if(el.payment_status === 'PENDING' && bookingStatus === 'active') {
          bookingStatus = 'pending'
        }

        const booking = {
          id: el._id,
          status: bookingStatus,
          play_time: el.play_time,
          field: {
            id: el.field_id._id,
            name: el.field_id.name,
            img_url: el.field_id.img_url 
          } 
        }

        return booking
      })
      return ResponseAPI.success(res, {
        totalPage: totalPage,
        currentPage: page,
        data: parsedResult
      })
    } catch (error) {
        next(error);
    }
  },
  
  async getDetailBooking(req, res, next) {
    try {
        // validasi param id
        const {id} = req.params;
        if(id.length < 12) {
          return ResponseAPI.error(res, "Booking is not valid")
        }

        // get data
        const result = await Booking.findById(id)
          .populate('field_id', '_id name location img_url price')
          .populate("user_id", "_id first_name img_url")

        if(!result) {
          return ResponseAPI.error(res, 'Booking is not found', 404)
        }

        const now = DateTime.now().setZone("Asia/Jakarta");
        const playTime = new Date(result.play_time)
        let bookingStatus = (playTime.getTime() > now.toMillis()) ? 'active' : 'passed'
        if(result.payment_status === 'PENDING' && bookingStatus === 'active') {
          bookingStatus = 'pending'
        }

        const response = {
          id: result._id,
          status: bookingStatus,
          booking_date: result.booking_time,
          play_time: result.play_time,
          payment_method: result.payment_method,
          field: {
            id: result.field_id._id,
            nama: result.field_id.name,
            lokasi: result.field_id.location,
            img_url: result.field_id.img_url,
            price: result.field_id.price,
          },
          customer: {
            name: result.user_id.first_name,
            imgUrl: result.user_id.img_url,
          }
        }

        // response
      return ResponseAPI.success(res, response)
    } catch (error) {
        next(error);
    }
  },
  
  async updateStatusBooking(req, res, next) {
    try {
      const {id} = req.params
      if(id.length < 12) {
        return ResponseAPI.error(res, 'ID is not valid', 400)
      }
      const booking = await Booking.findById(id)
      if(!booking) {
        return ResponseAPI.notFound(res, 'Booking is not found')
      }
      booking.payment_status = 'COMPLETED'
      await booking.save()
      return ResponseAPI.success(res, "Update booking berhasil")
    } catch (error) {
        next(error);
    }
  },

  async getScheduleBooking(req, res, next) {
    try {
      // validasi param 
      const {date, field_id} = req.query
      if(!date || !field_id) {
        return ResponseAPI.error(res, "required param is not provided", 400)
      }
      const dateObject = new Date(date);
      if(isNaN(dateObject.getTime()) || date !== dateObject.toISOString()) {
        return ResponseAPI.error(res, "date param is not ISO format", 400)
      }
      if(field_id.length < 24) {
        return ResponseAPI.error(res, "field id is not vaid", 400)
      }

      // request booking
      const start = new Date(Date.UTC(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate()))
      const end = new Date(start.toISOString())
      end.setDate(start.getDate() + 1)
      const result = await Booking.find({
        field_id: field_id,
        play_time: {
          $gte: start,
          $lt: end
        }
      }).select("play_time")

      // parsing booking
      const bookedHour = result.map(e => {
        return (new Date(e.play_time)).getUTCHours()
      })
      const response = []
      for(let i = 8; i <= 22; i++) {
        response.push({
          hour: i,
          booked: bookedHour.includes(i)
        })
      }

      // response
      ResponseAPI.success(res, response)
    } catch(error) {
      next(error)
    }
  }
}

module.exports = bookingController