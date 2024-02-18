const path = require('path');
const express = require('express');
const router = express.Router();

router.use('/', express.static(path.resolve('./pages')));
router.use('/', express.static(path.resolve('./res')));
router.use('/', express.static(path.resolve('./res/Fonts')));
router.use('/', express.static(path.resolve('./pages/images')));
router.use('/', express.static(path.resolve('./images')));

router.get('/', function(req, res) {
  res.sendFile(path.resolve('./pages/index.html'));
});

module.exports.router = router;