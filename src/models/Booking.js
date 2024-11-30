const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  field_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Field',
    required: [true, 'Field ID is required']
  },
  booking_time: {
    type: Date,
    required: [true, 'Booking time is required']
  },
  play_time: {
    type: Date,
    required: [true, 'Booking time is required'],
  },
  payment_status: {
    type: String,
    enum: ['PENDING', 'COMPLETED'],
    required: [true, 'Payment status is required']
  },
  payment_method: {
    type: String,
    enum: ['BAYAR_LOKASI', 'BAYAR_ONLINE'],
    required: [true, 'Payment method is required']
  }
}, {
  timestamps: true
})

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking;