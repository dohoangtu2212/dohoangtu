import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";

// Khởi tạo OAuth2Client với Client ID và Client Secret
const myOAuth2Client = new OAuth2Client(
  process.env.GOOGLE_MAILER_CLIENT_ID,
  process.env.GOOGLE_MAILER_CLIENT_SECRET
);
// Set Refresh Token vào OAuth2Client Credentials
myOAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
});

const sendEmail = async (
  receivers: string,
  title: string,
  content: string,
  subject?: string,
  text?: string
) => {
  const myAccessTokenObject = await myOAuth2Client.getAccessToken();

  const myAccessToken = myAccessTokenObject?.token;

  const transportOptions: any = {
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.ADMIN_EMAIL_ADDRESS,
      clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
      clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
      refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
      accessToken: myAccessToken,
    },
  };

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport(transportOptions);

  // setup email data with unicode symbols
  const mailOptions: any = {
    from: {
      name: title,
      address: process.env.ADMIN_EMAIL_ADDRESS,
    }, // sender address
    to: receivers, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: content, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error: any, _res: any) => {
    if (error) {
      console.error("error", error);
      return false;
    }
    console.error("true", true);

    return true;
  });
};

const mailService = {
  sendEmail,
};

export default mailService;
