require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
// require('/firebase/config.js');
const pages = require('./routes/pages.js').router;
const project = require('./routes/project.js').router;
// const auth = require('./routes/auth.js').router;

app.use(express.json());

app.use('/', pages);
// app.use('/auth', auth);

app.use('/', express.static(path.resolve('./lib')));
app.use('/project', project)

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message);
});

app.listen(3000);