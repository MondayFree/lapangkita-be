const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const authorizeRoles = require('../middleware/authorization');
const ROLES = require('../constant/roles');

const upload = require('../utils/multer-cloudinary');
// const upload = require('../utils/multer')

const router = express.Router();

router.post('/users/login', userController.login);
router.post('/users', userController.register);
router.get('/users', auth, authorizeRoles([ROLES.ADMIN]), userController.getAllUser);
router.get('/users/:id', auth, authorizeRoles([ROLES.ADMIN, ROLES.CUSTOMER]), userController.getDetailUser);
router.patch('/users/:id', auth, authorizeRoles([ROLES.ADMIN, ROLES.CUSTOMER]), upload.single('photo'), userController.updateUser);
router.patch('/users/:id/password', auth, authorizeRoles([ROLES.CUSTOMER]), userController.updatePassword);

module.exports = router;