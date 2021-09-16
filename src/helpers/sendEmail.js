import { config } from 'dotenv';
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

config();
const { EMAIL, PASS, FRONTEND_URL } = process.env;
const sendEmail = async (type, data = {}) => {
  try {
    const mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Dev Pulse',
        link: FRONTEND_URL,
      },
    });
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: EMAIL,
        pass: PASS,
      },
    });
    const mailOptions = {
      to: `${data.email}`,
      subject: `${type}`,
      html: '',
    };
    let email = '';
    switch (type) {
      case 'whitelist':
        email = {
          body: {
            name: data.name,
            intro: `Welcome on Devpluse Your email has been whitelisted. Check your <a href="${FRONTEND_URL}">Profile</a>`,
            outro:
              "Need any help or have questions? Just reply to this email, we'd love to help.",
          },
        };
        mailOptions.html = mailGenerator.generate(email);

        break;
      case 'blacklist':
        email = {
          body: {
            name: data.name,
            intro: 'Your access to Dev pluse has been revoked.',
            outro:
              "Need any help or have questions? Just reply to this email, we'd love to help.",
          },
        };

        mailOptions.html = mailGenerator.generate(email);

        break;
      case 'ratingCreated':
        email = {
          body: {
            name: data.name,
            intro: `You Have been rated, checkout your ratings <a href=" ${FRONTEND_URL}/users/${data.traineeId}">Here</a>`,
            outro:
              "Need any help or have questions? Just reply to this email, we'd love to help.",
          },
        };

        mailOptions.html = mailGenerator.generate(email);

        break;

      default:
        mailOptions.html = '';
    }
    await transporter.sendMail(mailOptions);
  } catch (error) {
    return error;
  }
};
export default sendEmail;
