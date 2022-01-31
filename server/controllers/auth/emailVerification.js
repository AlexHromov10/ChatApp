require("dotenv").config();
const nodemailer = require("nodemailer");
const IPs = require("./IPs");

function sendEmail(email, email_verification_code) {
  const transporter = nodemailer.createTransport({
    port: 465, // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
      user: process.env.chatEmail_address,
      pass: process.env.chatEmail_password,
    },
    secure: true,
  });

  const mailData = () => {
    return {
      from: process.env.chatEmail_address, // sender address
      to: email, // list of receivers
      subject: "Yupchick Chat. Подтверждение e-mail адреса",
      text: `Для подтверждения e-mail адреса перейдите по ссылке: ${
        IPs.myIP().express_ip
      }/auth/emailverification/${email_verification_code}`,
    };
  };

  console.log(mailData());

  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
}

module.exports = {
  sendEmail,
};
