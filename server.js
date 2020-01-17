const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

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
  const { firstName, lastName, email, subject, text } = req.body;
  console.log(req.body);
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'officialozzystore@gmail.com',
      pass: 'Ozzy2...store'
    }
  });
  let info = await transporter.sendMail({
    from: email, // sender address
    to: 'officialozzystore@gmail.com', // list of receivers
    subject: subject, // Subject line
    html: text
  });
  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  res.status(200).json('success');
});
app.post('/order', async (req, res) => {
  const { email, subject, html } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'officialozzystore@gmail.com',
      pass: 'Ozzy2...store'
    }
  });
  let info = await transporter.sendMail({
    from: 'officialozzystore@gmail.com',
    to: email,
    subject,
    html
  });
  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  res.status(200).json('success');
});

module.exports = app;

app.listen(process.env.PORT || 8080, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
