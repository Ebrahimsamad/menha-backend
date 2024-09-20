const CustomError = require("../utils/customError");
const transporter = require("../utils/nodemialer");

exports.contactUs = async (req, res, next) => {
  const { name, email, message } = req.body;

  try {
    const mailOptions = {
      from: `${email} <${process.env.NODEMAILER_EMAIL}>`,
      to: process.env.NODEMAILER_EMAIL,
      subject: `Contact from ${name}`,
      html: `
            <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          }
          .header {
            text-align: center;
            padding-bottom: 20px;
            background-color: #002b4c;
            border-radius: 10px 10px 0 0;
            color: #ffffff;
          }
          .header img {
            margen:5px,0;
            max-width: 150px;
            margin-bottom: 10px;
          }
          .header h1 {
            font-size: 24px;
            margin: 0;
          }
          .content {
            padding: 20px;
            background-color: #ffffff;
            border: 1px solid #e0e0e0;
            border-radius: 0 0 10px 10px;
          }
          .content p {
            margin: 0 0 15px;
            color: #8A690F;
          }
          .content strong {
            color: #002b4c;
          }
          .footer {
            text-align: center;
            padding: 15px;
            border-radius: 0 0 10px 10px;
            font-size: 12px;
          }
          .footer a {
            text-decoration: none;
            font-weight: bold;
          }
          .footer a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <img src="https://ik.imagekit.io/2crfufcjy/static/logo.png?updatedAt=1726792325081" alt="Logo">
            <h1>Welcome to Our Service</h1>
          </div>
          <div class="content">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>
          </div>
          
        </div>
      </body>
      </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "Email sent successfully." });
  } catch (err) {
    next(new CustomError("Internal server error.", 500));
  }
};
