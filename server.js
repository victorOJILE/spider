require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
// require('/firebase/config.js');
const pages = require('./routes/pages.js');
const project = require('./routes/project.js');
const auth = require('./routes/auth.js');
const mailer = require('./controllers/mailer.js');

app.use(express.json());

app.use('/', pages);
app.use('/auth', auth);

app.use('/', express.static(path.resolve('./lib')));
app.use('/project', project);

app.post('/mailer', mailer);

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message);
});

app.listen(3000);