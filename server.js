const express = require('express')
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.get('/', (req, res) => res.send('Server is Running'))
app.post('/sendmail', async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    subject,
    text
  } = req.body
  console.log(req.body);
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ozzycdes@gmail.com',
      pass: '+Bello..3'
    }
  })
  let info = await transporter.sendMail({
    from: "ozzycdes@gmail.com", // sender address
    to: "officialozzystore@gmail.com", // list of receivers
    subject: email, // Subject line
    text: email, // plain text body
    html: `name: ${firstName} ${lastName}
          ${text}
            ` // html body
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  res.status(200).json("success");
});

module.exports = app;

app.listen(process.env.PORT || 8080, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});