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
        console.log("Register Email sent!"); 
      },
      error => { 
        console.error(error);
          if (error.response) {
           console.error('register', error.response.body);
        }
      }
    )
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
          console.log("Purchase Email sent!"); 
        },
      error => { 
          console.error(error);
          if (error.response) {
            console.error('purchase', error.response.body);
        }
      }
    );
};

const refund = (email, name) => {    
  const message = {
      to: email,
      from: process.env.MAILER_FROM,
      subject: `Sorry to hear that!`,
      text: `Refund`,
      html: `<h1>${name}, we sent the amount back to your bank account</h1>`,
  }
  sgMail.send(message).then(
    () => { 
        console.log("Refund Email sent!"); 
      },
    error => { 
        console.error(error);
        if (error.response) {
          console.error('refund', error.response.body);
      }
    }
  );
};

module.exports = { welcomeEmail, purchase, refund }