const express = require('express');
const fieldController = require('../controllers/fieldController');
const auth = require('../middleware/auth');
const authorizeRoles = require('../middleware/authorization');
const ROLES = require('../constant/roles');
const upload = require('../utils/multer');

const router = express.Router();

router.get('/fields', auth, authorizeRoles([ROLES.ADMIN, ROLES.CUSTOMER]), fieldController.getAllField);
router.get('/fields/:id', auth, authorizeRoles([ROLES.ADMIN, ROLES.CUSTOMER]), fieldController.getDetailField);
router.patch('/fields/:id', auth, authorizeRoles([ROLES.ADMIN]), upload.array('photo', 12), fieldController.updateField);
router.post('/fields/', auth, authorizeRoles([ROLES.ADMIN]),  upload.array('photo', 12), fieldController.addField);

module.exports = router;