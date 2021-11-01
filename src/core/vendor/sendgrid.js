const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.MAILER_KEY);
   
const welcomeEmail = (email, name) => {    
    const message = {
        to: email,
        from: process.env.MAILER_FROM,
        subject: `Hello!`,
        text: `Welcome`,
        html: `<h1>Welcome Aboard, ${name}</h1>`,
    }
    
    sgMail.send(message).then(
      () => {
        console.log("Email sent!"); 
      },
      error => { 
        console.error(error);
          if (error.response) {
           console.error(error.response.body);
        }
      }
    );
};

const purchase = (email, res) => {    
    const message = {
        to: email,
        from: process.env.MAILER_FROM,
        subject: `Get ready!`,
        text: `Purchase`,
        html: `<h1>Thank you for buying with us.</h1>
              Here is some informations about your purchase:
              Purchase Number: ${res}`,
    }
    
    sgMail.send(message).then(
      () => { 
          console.log("Email sent!"); 
        },
      error => { 
          console.error(error);
          if (error.response) {
            console.error(error.response.body);
        }
      }
    );
};

const refund = (email) => {    
  const message = {
      to: email,
      from: process.env.MAILER_FROM,
      subject: `Sorry to hear that!`,
      text: `Refund`,
      html: `<h1>We sent the amount back to your bank account</h1>`,
  }
  sgMail.send(message).then(
    () => { 
        console.log("Email sent!"); 
      },
    error => { 
        console.error(error);
        if (error.response) {
          console.error(error.response.body);
      }
    }
  );
};

module.exports = { welcomeEmail, purchase, refund }