require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Booking = require('../models/Booking');
const Field = require('../models/Field');
const { mongodbUri } = require('../config/env');

const createUser = async () => {
    const users = [
        {
            first_name: "Joni",
            last_name: "Cage",
            email: "joni@gmail.com",
            password: '123asd',
            phone_number: '0837287292391',
            gender: 'PRIA',
            birth_date: new Date('2003-04-19T00:00:00'),
            province: 'Kalimantan Barat',
            kabupaten: 'Kayong Utara',
            kecamatan: 'Kubu Raya',
            role: 'CUSTOMER'
        },
        {
            first_name: "John",
            last_name: "Wick",
            email: "john@gmail.com",
            password: '123asd',
            birth_date: new Date('2003-04-19T00:00:00'),
            kabupaten: 'Kayong Utara',
            role: 'CUSTOMER'
        },
        {
            first_name: "Santi",
            email: "santi@gmail.com",
            password: 'admin#123',
            gender: 'WANITA',
            role: 'ADMIN'
        },
    ]
    return await User.create(users)
}

const createField = async () => {
    const fields = [
        {
            name: 'Lapang A',
            location: 'OUTDOOR',
            img_url: ['https://gambar.com/futsal', 'https://gambar.com/futsal', 'https://gambar.com/futsal'],
            facility: ['papan score', 'jaring pembatas', 'bangku', 'bola cadangan', 'P3K'],
            floor_type: 'INTERLOCK',
            price: '100000'
        },
        {
            name: 'Lapang B',
            location: 'INDOOR',
            img_url: ['https://gambar.com/futsal', 'https://gambar.com/futsal', 'https://gambar.com/futsal'],
            facility: ['papan score', 'jaring pembatas', 'bangku', 'bola cadangan', 'P3K', 'rompi'],
            floor_type: 'SINTETIS',
            price: '130000'
        },
        {
            name: 'Lapang C',
            location: 'OUTDOOR',
            img_url: ['https://gambar.com/futsal', 'https://gambar.com/futsal', 'https://gambar.com/futsal'],
            facility: ['papan score', 'jaring pembatas', 'bola cadangan'],
            floor_type: 'VINYL',
            price: '80000'
        },
    ]
    return await Field.create(fields)
}

const createBooking = async (userId, fieldId, bookingTime, playTime, paymentStatus, paymentMethod) => {
    return await Booking.create({
        user_id: userId,
        field_id: fieldId,
        booking_time: bookingTime,
        play_time: playTime,
        payment_status: paymentStatus,
        payment_method: paymentMethod
    })
}

(async () => {
    try {
        await mongoose.connect(mongodbUri);
        await User.deleteMany();
        await Field.deleteMany();
        await Booking.deleteMany();
        const users = await createUser()
        const fields = await createField()
        for(const user of users) {
            if(user.role === 'ADMIN') continue
            if(user.email === 'joni@gmail.com') {
                await createBooking(user._id, fields[0]._id, new Date('2024-11-07T15:23:00'), new Date('2024-11-13T09:00:00'), 'COMPLETED', 'BAYAR_ONLINE')
                await createBooking(user._id, fields[2]._id, new Date('2024-11-25T15:23:00'), new Date('2024-12-03T09:00:00'), 'COMPLETED', 'BAYAR_LOKASI')
            }
            if(user.email === 'john@gmail.com') {
                await createBooking(user._id, fields[1]._id, new Date('2024-11-10T08:15:00'), new Date('2024-11-15T14:00:00'), 'COMPLETED', 'BAYAR_LOKASI')
                await createBooking(user._id, fields[2]._id, new Date('2024-11-27T11:05:00'), new Date('2024-11-30T20:00:00'), 'PENDING', 'BAYAR_ONLINE')
            }
        }
        console.log('success');
        process.exit(0);
    } catch(err) {
        console.log(err.message);
        process.exit(1);
    }
})()

