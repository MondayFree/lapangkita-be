const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ResponseAPI = require('../utils/response');
const { jwtSecret, jwtExpiresIn } = require('../config/env');
const imageUpload = require('../utils/img');

const generateToken = user => {
    const jwtPayload = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }
    return jwt.sign(jwtPayload, jwtSecret, { expiresIn: jwtExpiresIn });
};

const userController = {
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return ResponseAPI.error(res, 'Invalid email or password', 401);
            }
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                return ResponseAPI.error(res, 'Invalid email or password', 401);
            }
            const token = generateToken(user);
            ResponseAPI.success(res, {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    photo_url: user.photo_url,
                    role: user.role
                }
            });
        } catch (error) {
            next(error)
        }
    },

    async register(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    },

    async getAllUser(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    },
    
    async getDetailUser(req, res, next) {
        try {
           
        } catch (error) {
            next(error);
        }
    },

    async updateUser(req, res, next) {
        try {

            // contoh kode upload gambar
            const uploadedImgUrl = await imageUpload(file)
            console.log(uploadedImgUrl); // berisi url gambar yang sudah diupload
    
        } catch (error) {
            next(error);
        }
    },
    
    async updatePassword(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }
};

module.exports = userController;