const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const {OAuth2} = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';     //https://mail.google.com


const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN ,
    SENDER_EMAIL_ADDRESS
} =process.env

const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN ,
    OAUTH_PLAYGROUND
)

//send mail

const sendEmail = (to,url,txt)=>{
    oauth2Client.setCredentials({
        refresh_token:MAILING_SERVICE_REFRESH_TOKEN
    })

    const accessToken = oauth2Client.getAccessToken()
    const smtpTransport = nodemailer.createTransport({
        service:'gmail',
        auth:{
            type:'OAuth2',
            user:SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret:MAILING_SERVICE_CLIENT_SECRET,
            refreshToken:MAILING_SERVICE_REFRESH_TOKEN,
            accessToken
            
        }
    })

    const mailOptions={
        form:SENDER_EMAIL_ADDRESS,
        to:to,
        subject:"BLUEROCKET",
        html:`
        <div style="max-width: 700px; margin:auto; border: 5px solid coral; padding: 50px 20px; font-size: 110%;">
        <h2 style="text-align: center; text-transform: uppercase;color: green;">Welcome to  <span style="color:skyblue; font-family: 'Times New Roman', Times, serif;">BLUEROCKET</span>.<br/>🙏🙏🙏</h2>
        <div className="ui divider">🙏</div>
        <p>Congratulations!🎉🎉<br/> You're almost set to start using codedev.
            Just click the button below to validate your email address.😀😃
            and update your profile
        </p>
        
        <h3>👉</h3><a href=${url} style="background: green; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
    
        <p>If the button doesn't work for any reason, you can also click on the link below:</p>
    
        <div>${url}</div>
        </div>
        `
    }
    smtpTransport.sendMail(mailOptions,(err,infor)=>{
        if(err) return err;
        return infor
    })
}

//Resend Email
const ResendEmail = (to,url,txt)=>{
    oauth2Client.setCredentials({
        refresh_token:MAILING_SERVICE_REFRESH_TOKEN
    })

    const accessToken = oauth2Client.getAccessToken()
    const smtpTransport = nodemailer.createTransport({
        service:'gmail',
        auth:{
            type:'OAuth2',
            user:SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret:MAILING_SERVICE_CLIENT_SECRET,
            refreshToken:MAILING_SERVICE_REFRESH_TOKEN,
            accessToken
            
        }
    })

    const mailOptions={
        form:"BLUEROCKET",
        to:to,
        subject:"Our Thinking",
        html:`
        <div style="max-width: 700px; margin:auto; border: 5px solid coral; padding: 50px 20px; font-size: 110%;">
        <h2 style="text-align: center; text-transform: uppercase;color: green;">Welcome to <span style="color:skyblue; font-family: 'Times New Roman', Times, serif;">BLUEROCKET</span>.<br/>🙏🙏🙏</h2>
        <p style="border:2px solid gray,width:100%">
       <b>Please click on below Button to reset your account password</b>
        
        <h3>👉</h3><a href=${url} style="background: green; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
    
        <p>If the button doesn't work for any reason, you can also click on the link below:</p>
    
        <div>${url}</div>
        </div>
        `
    }
    smtpTransport.sendMail(mailOptions,(err,infor)=>{
        if(err) return err;
        return infor
    })
}

module.exports = {sendEmail,ResendEmail}
// SENDER_EMAIL_ADDRESS