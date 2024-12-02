const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const ROLES = require('../constant/roles');

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  last_name: {
    type: String,
    trim: true,
    default: ""
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  img_url: {
    type: String,
    trim: true,
    default: ""
  },
  phone_number: {
    type: String,
    trim: true,
    default: "",
  },
  gender: {
    type: String,
    enum : ["PRIA", "WANITA"],
    default: "PRIA"
  }, 
  birth_date: {
    type: Date,
    default: ""
  },
  province: {
    type: String,
    trim: true,
    default: ""
  },
  kabupaten: {
    type: String,
    trim: true,
    default: ""
  },
  kecamatan: {
    type: String,
    trim: true,
    default: ""
  },
  role: {
    type: String,
    required: [true, 'Role must be specified'],
    enum : [ROLES.CUSTOMER, ROLES.ADMIN],
    default: ROLES.CUSTOMER
}
}, {
  timestamps: true
})

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema)

module.exports = User;