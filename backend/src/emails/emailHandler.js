import { resendClient,sender } from "../lib/resend.js"
import { createWelcomeEmailTemplate } from "./emailTemplates.js"


export const sendWelcomeEmail=async(email,name,clientURL)=>{
    const {data,error}= await resendClient.emails.send({
        from:`${sender.name} <${sender.email}>`,
        to:email,
        subject:"Welcome to Chatzyy!!",
        html:createWelcomeEmailTemplate(name,clientURL)
    });
    if(error){
        console.log("Error sending the welcome email..: ",error);
    }

    console.log("Welcome email sent successfully: ",data)

}