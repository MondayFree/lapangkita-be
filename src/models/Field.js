const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Field name is required'],
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    enum: ['INDOOR', 'OUTDOOR']
  },
  img_url: {
    type: [String],
    required: [true, 'Url is required'],
  },
  facility: {
    type: [String],
    required: [true, 'Facility is required'],
  },
  floor_type: {
    type: String,
    required: [true, 'Floor type is required'],
    enum: ['SINTETIS', 'VINYL', 'INTERLOCK']
  }, 
  price: {
    type: String,
    required: [true, 'Price is required'],
    trim: true
  }
}, {
  timestamps: true
})

const Field = mongoose.model('Field', fieldSchema)

module.exports = Field;