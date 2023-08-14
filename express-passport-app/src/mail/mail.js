const mailer = require('nodemailer');
const welcome = require('./welcome.template');
const goodbye = require('./goodbye.template')

const getEmailData = (to, name, template) => {
  let data = null;

  switch (template) {
    case "welcome":
      data = {
        from: 'hyunwoomemo@gmail.com',
        to,
        subject: `Hello ${name}`,
        html: welcome()
      }
      break;
    case "goodbye":
      data = {
        from: 'hyunwoomemo@gmail.com',
        to,
        subject: `Goodbye ${name}`,
        html: goodbye()
      }
      break;
    default:
      break;
  }

  return data
}

const sendMail = (to, name, type) => {
  const transporter = mailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'hyunwoomemo@gmail.com',
      pass: process.env.EMAIL_PASSWORD
    }
  })
  
  const mail = getEmailData(to, name, type);
  
  transporter.sendMail(mail, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log('email sent successfully');
    }
  
    transporter.close();
  })
}

module.exports = sendMail