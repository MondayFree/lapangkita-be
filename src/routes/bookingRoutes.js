const express = require('express');
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');
const authorizeRoles = require('../middleware/authorization');
const ROLES = require('../constant/roles');

const router = express.Router();

router.post('/bookings', auth, authorizeRoles([ROLES.CUSTOMER]), bookingController.addBooking);
router.get('/bookings/schedule', auth, authorizeRoles([ROLES.ADMIN, ROLES.CUSTOMER]), bookingController.getScheduleBooking);
router.get('/bookings', auth, authorizeRoles([ROLES.ADMIN]), bookingController.getAllBooking);
router.get('/users/:id/booking', auth, authorizeRoles([ROLES.CUSTOMER]), bookingController.getUserBooking);
router.get('/bookings/:id', auth, authorizeRoles([ROLES.ADMIN, ROLES.CUSTOMER]), bookingController.getDetailBooking);
router.patch('/bookings/:id/status', auth, authorizeRoles([ROLES.ADMIN]), bookingController.updateStatusBooking);

module.exports = router;