import nodemailer from "nodemailer"
import config from "config"

const USER = config.get("USER");
const PASS = config.get("PASS");

async function sendEmail(emailData){

    try {

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: USER,
                pass: PASS
            }
        });

    let sender = transporter.sendMail({
        from: emailData.from,
        to: emailData.to,
        text: emailData.text,
        html: emailData.html
    })

    console.log(`email sent successfully!🙌`);
    
    
    } catch (error) {
        console.log(error);
        
    }


}


export default sendEmail