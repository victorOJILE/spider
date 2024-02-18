const express = require('express');
const router = express.Router();

const auth = require('/contollers/auth.js');

router.post('/login.js', auth.login);

router.post('/createUser.js', auth.createUser);

router.post('/updateUser.js', auth.authenticate, auth.updateUser);

module.exports.router = router;