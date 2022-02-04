require("dotenv").config();
const nodemailer = require("nodemailer");

async function sendEmail(emailMessageData) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.chatEmail_address,
      pass: process.env.chatEmail_password,
    },
  });

  const mailData = {
    from: process.env.chatEmail_address, // sender address
    ...emailMessageData,
  };

  const responseSendEmail = await transporter.sendMail(mailData);
  console.log(responseSendEmail);
  if (responseSendEmail.rejected.length > 0) {
    return {
      success: false,
      message: "Неверный e-mail",
      info: responseSendEmail.info,
    };
  } else {
    return {
      success: true,
      message: "Успешно отправлено письмо на почту!",
      info: responseSendEmail.info,
    };
  }
}

module.exports = sendEmail;
