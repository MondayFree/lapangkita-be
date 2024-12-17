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
                    photo_url: user.img_url,
                    role: user.role
                }
            });
        } catch (error) {
            next(error)
        }
    },

    async register(req, res, next) {
        try {
            const {nama_depan, nama_belakang, email, password} = req.body
            if(!nama_depan || !nama_belakang || !email || !password) {
                return ResponseAPI.error(res, 'Input is invalid', 400);
            }
            const existingUser = await User.findOne({email})
            if(existingUser){
                return ResponseAPI.error(res, 'User is already registered', 400);
            }
            const user = await User.create({
                first_name: nama_depan, 
                last_name: nama_belakang, 
                email, 
                password
            })
            return ResponseAPI.success(res, {
                nama_depan: user.first_name,
                nama_belakang: user.last_name,
                email: user.email
            });
        } catch (error) {
            next(error)
        }
    },

    async getAllUser(req, res, next) {
        try {
            let {page, limit} = req.query
            if(!page || !limit) {
                return ResponseAPI.error(res, "Param is not valid", 400)
            }
            page = Number(page)
            limit = Number(limit)
            if(!page || !limit) {
                return ResponseAPI.error(res, "Param value is not valid", 400)
            }
            let filter = {}
            const name = req.query.name
            if(name) {
                filter = {
                    $or: [
                        {first_name: new RegExp(name, "i")},
                        {last_name: new RegExp(name, "i")}
                    ]
                }
            }
            const result = await User.find(filter)
                .limit(limit)
                .skip(limit * (page - 1))
                .select("first_name last_name")
            ResponseAPI.success(res, {
                limit,
                page,
                user: result
            })
        } catch (error) {
            next(error)
        }
    },
    
    async getDetailUser(req, res, next) {
        try {
            const id = req.params.id.trim()
            if(id.length < 12) {
                return ResponseAPI.error(res, "ID is not valid", 400)
            }
            const user = await User.findById(id)
            if(!user) {
                return ResponseAPI.notFound(res)
            }
            ResponseAPI.success(res, {
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                image_url: user.img_url,
                phone_number: user.phone_number,
                gender: user.gender.toLowerCase(),
                birth_date: user.birth_date,
                address: {
                    province: user.province,
                    kabupaten: user.kabupaten,
                    kecamatan: user.kecamatan
                }
            })
        } catch (error) {
            next(error);
        }
    },

    async updateUser(req, res, next) {
        try {
            const id = req.params.id.trim()
            if(id.length < 12) {
                return ResponseAPI.error(res, "ID is not valid", 400)
            }
            const newData = {}
            for(const prop in req.body) {
                switch(prop) {
                    case 'first_name' :
                    case 'last_name' :
                    case 'gender' :
                    case 'phone_number' :
                    case 'birth_date' :
                    case 'province' :
                    case 'kabupaten' :
                    case 'kecamatan' :
                        newData[prop] = req.body[prop]
                }
            }
            if(newData.gender) newData.gender = newData.gender.toUpperCase()
            const user = await User.findById(id)
            if(!user) {
                return ResponseAPI.notFound(res, "User doesn't exist")
            }
            if(req.file) {
                // uploadedImgUrl = await imageUpload(req.file)
                uploadedImgUrl = req.file.path;
                newData.img_url = uploadedImgUrl
            }
            for(const prop in newData) {
                user[prop] = newData[prop]
            }
            await user.save()
            ResponseAPI.success(res, {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                img_url: user.img_url,
                phone_number: user.phone_number,
                gender: user.gender,
                birth_date: user.birth_date,
                province: user.province,
                kabupaten: user.kabupaten,
                kecamatan: user.kecamatan
            })
        } catch (error) {
            next(error);
        }
    },
    
    async updatePassword(req, res, next) {
        try {
            const id = req.params.id.trim()
            if(id.length < 12) {
                return ResponseAPI.error(res, "ID is not valid", 400)
            }
            const {newPassword, oldPassword} = req.body
            if(!newPassword || !oldPassword) {
                return ResponseAPI.error(res, 'Input is not valid', 400)
            }
            const user = await User.findById(id)
            if(!user) {
                return ResponseAPI.notFound(res, 'User is not found')
            }
            const result = await user.comparePassword(oldPassword)
            if(result) {
                user.password = newPassword
                await user.save()
                return ResponseAPI.success(res, {}, "Berhasil")
            } else {
                return ResponseAPI.error(res, "Password is wrong", 401)
            }
        } catch (error) {
            next(error);
        }
    }
};

module.exports = userController;