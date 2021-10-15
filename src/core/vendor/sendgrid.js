const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.MAILER_KEY);
   
const welcomeEmail = (email, name) => {    
    const message = {
        to: email,
        from: process.env.MAILER_FROM,
        subject: `Hello!`,
        text: `Hello`,
        html: `<h1>Welcome Aboard, ${name}</h1>`,
    }
    
    console.log(message);
    sgMail.send(message).then(
      () => { 
          console.log("Email sent!", message); },
      error => { 
          console.error(error);
          if (error.response) {
              console.error(error.response.body);
        }
      }
    );
};

module.exports = { welcomeEmail }