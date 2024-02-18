const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth');

router.post('/login', auth.login);

router.post('/createUser', auth.createUser);

router.post('/updateUser',/* auth.authenticate,*/ auth.updateUser);

module.exports = router;