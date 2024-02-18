const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.forwardemail.net",
  port: 465,
  secure: true,
  auth: {
    user: "ojilevictor11@gmail.com",
    pass: process.env.GMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

module.exports = async function(req, res) {
  const options = req.body;
    
  try {
    // await transporter.sendMail(mails[options.type](options));
    res.json(options);
  } catch(e) {
    console.error(e);
    res.status(500).send("");
  }
}

const mails = {
  productSubmission(userData) {
    return {
      from: '"Grestor" ojilevictor11@gmail.com',
      to: userData.email,
      subject: "Product Submission on Grestor",
      html: `${emailHead('Grestor Product Submission')}
    <body style="font-size: 15px; line-height: 180%; padding: 10px; background-color: #f4f7fb">
      <article style="background-color: white; padding: 10px">
        <p>Dear ${userData.name.split(' ').slice(1).join(" ")},</p>
    
        <p>This email is to inform you that we have received your product submission request.</p>
        
        <div style="margin-top: 1rem">
          <h2 style="margin: 0">Product Name: </h2>
          <strong>${userData.productName}</strong>
        </div>

        <p>However, please note that our team will carefully review and assess your product, 
          and this process may take up to 5-10 days. <strong>We strive to ensure that every product on 
          Grestor meets our quality standards and aligns with our community guidelines.</strong></p>
    
        <p>To ensure a smooth review, please take a moment to revisit our product submission 
          requirements outlined on our product submission page. <strong>Ensuring that your product 
          meets these criteria will significantly contribute to a smooth approval process.</strong></p>
    
        <p style="font-size: 13px">If you have any questions or concerns regarding the review process or need assistance 
          with meeting the submission requirements, please do not hesitate to contact our support 
          team at [support@grestor.com].</p>
    
        <p><strong>Best regards,</strong></p>
        <div>Grestor Team</div>
      </article>
      ${emailFooter()}
    </body></html>`
    };
  },
  signupOTP(userData) {
    return {
      from: '"Grestor" ojilevictor11@gmail.com',
      to: userData.email,
      subject: "Confirm your Grestor account OTP",
      html: `${emailHead('Confirm your Grestor account OTP')}
    <body style="font-size: 15px; line-height: 180%; padding: 10px; background-color: #f4f7fb">
      <article style="background-color: white; padding: 10px">
        <p>Dear ${userData.fullname},</p>
    
        <p>Thank you for signing up on Grestor. To complete your registration, please use 
          the OTP (One-Time Password) verification code below:</p>
        
        <div style="margin: 1rem 0rem; text-align: center">
          <h2 style="margin: 0">OTP: </h2>
          <strong>${userData.code}</strong>
        </div>

        <p style="margin-top: 3rem"><strong>Best regards,</strong></p>
        <div>Grestor Team</div>
      </article>
      ${emailFooter()}
    </body></html>`
    }
  },
  subscribedUser(userData) {
    return {
      from: '"Grestor" ojilevictor11@gmail.com',
      to: userData.email,
      subject: "Grestor membership subscription",
      html: `${emailHead('Grestor membership subscription')}
    <body style="font-size: 15px; line-height: 180%; padding: 10px; background-color: #f4f7fb">
      <article style="background-color: white; padding: 10px">
        <p>Dear ${userData.fullname},</p>

        <p><strong>Thanks for your subscription.</strong></p>
        <p>Your membership payment has been recieved and your account has been activated successfully
         on Grestor.</p>

        <button style="">Click here to login</button>

        <p><strong>Best regards,</strong></p>
        <div>Grestor Team</div>
      </article>
      ${emailFooter()}
    </body></html>`
    }
  },
  affProductPurchase(userData) {
    return {
      from: '"Grestor" ojilevictor11@gmail.com',
      to: userData.affEmail,
      subject: "BOOM: You just made a successful sale",
      html: `${emailHead('You just made a successful sale')}
    <body style="font-size: 15px; line-height: 180%; padding: 10px; background-color: #f4f7fb">
      <article style="background-color: white; padding: 10px">
        <p>Dear ${userData.fullname},</p>
    
        <p>NEW SALE. A new sale of ${userData.name} has been recorded for you.</p>
        <p>You've earned a commission of ${(Number(userData.amount) /100) * Number(userData.commision)}% from this sale.</p>

        <p>You are doing a great job.</p>
        <p>Keep crushing sales.</p>
        
        <p><strong>Best regards,</strong></p>
        <div>Grestor Team</div>
      </article>
      ${emailFooter()}
    </body></html>`
    }
  },
  vendorProductSalesAwareness(userData) {
    return {
      from: '"Grestor" ojilevictor11@gmail.com',
      to: userData.vendorEmail,
      subject: "BOOM: You just made a successful sale",
      html: `${emailHead('You just made a successful sale')}
    <body style="font-size: 15px; line-height: 180%; padding: 10px; background-color: #f4f7fb">
      <article style="background-color: white; padding: 10px">
        <p>Dear ${userData.vendorName},</p>

        <p>NEW SALE. A new sale of ${userData.name} has been recorded for you. 
          This sale was facilitated by an affiliate: ${userData.affName}.</p>
        
        <p><strong>Best regards,</strong></p>
        <div>Grestor Team</div>
      </article>
      ${emailFooter()}
    </body></html>`
    }
  }
}

function emailHead(title) {
  return `
  <html><head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      margin: 20px;
    }

    h1 {
      color: #333;
      margin: 1rem 0;
    }

    p {
      color: #2e2d2d;
      margin: 1rem 0rem 0rem;
    }

    a {
      color: #007BFF;
    }
  </style>
</head>
  `;
}

function emailFooter() {
  return `
    <footer style="background-color: #f4f7fb; padding: 12px; font-size: 13px; text-align: center">
      <div><p>&copy;${new Date().getFullYear()} <strong><a href="https://grestor.com/overview">Grestor</a></strong>. 
        All Rights Reserved.</p></div>
    </footer>
  `
}