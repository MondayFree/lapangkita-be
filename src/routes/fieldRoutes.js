const express = require('express');
const fieldController = require('../controllers/fieldController');
const auth = require('../middleware/auth');
const authorizeRoles = require('../middleware/authorization');
const ROLES = require('../constant/roles');

const router = express.Router();

router.get('/fields', auth, authorizeRoles([ROLES.ADMIN, ROLES.CUSTOMER]), fieldController.getAllField);
router.get('/fields/:id', auth, authorizeRoles([ROLES.ADMIN, ROLES.CUSTOMER]), fieldController.getDetailField);
router.patch('/fields/:id', auth, authorizeRoles([ROLES.ADMIN]), fieldController.updateField);

module.exports = router;