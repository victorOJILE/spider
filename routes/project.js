const path = require('path');
const express = require('express');
// const auth = require('/contollers/auth.js');
// const data = require('/controllers/data.js');
const router = express.Router();

router.get('/', function(req, res) {
  res.sendFile(path.resolve('./index.html'));
});

// router.get('/files', auth.authenticate, data.getFiles);

// router.get('/files/:folderRef', auth.authenticate, data.getFolder);

// router.update('/files/:folderRef', auth.authenticate, data.updateFolder);

// router.delete('/files/:folderRef', auth.authenticate, data.deleteFolder);

// router.get('/files/:folderRef/:fileRef', auth.authenticate, data.getFile);

// router.update('/files/:folderRef:fileRef', auth.authenticate, data.updateFile);

// router.delete('/files/:folderRef:fileRef', auth.authenticate, data.deleteFile);

// router.get('/files/snippets', auth.authenticate, data.getMySnippets);

module.exports = router;