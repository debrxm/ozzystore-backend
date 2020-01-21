const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'officialozzystore@gmail.com',
    pass: 'Ozzy2...store'
  }
});
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cors());
app.get('/', (req, res) => res.send('Server is Running'));
app.post('/sendmail', async (req, res) => {
  const {
    email,
    subject,
    text
  } = req.body;
  let info = await transporter.sendMail({
    from: email,
    to: 'officialremediclothing@gmail.com',
    subject: subject,
    html: text
  });
  res.status(200).json('success');
});
app.post('/order', async (req, res) => {
  const {
    email,
    subject,
    html
  } = req.body;

  let info = await transporter.sendMail({
    from: 'officialremediclothing@gmail.com',
    to: email,
    subject,
    html
  });
  res.status(200).json('success');
});
app.post('/sendorder', async (req, res) => {
  const {
    email,
    subject,
    html
  } = req.body;
  let info = await transporter.sendMail({
    from: 'officialozzystore@gmail.com',
    to: 'officialremediorder@gmail.com',
    subject,
    html
  });
  res.status(200).json('success');
});
app.post('/usepromo', async (req, res) => {
  const {
    code
  } = req.body;
  const promos = {
    rmd200: 200
  }
  for (let key in promos) {
    if (promos.hasOwnProperty(key) & key === code.toLowerCase()) {
      res.status(200).json(promos[key]);
    }
  }
});

module.exports = app;

app.listen(process.env.PORT || 8080, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});