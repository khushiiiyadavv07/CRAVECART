const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
    service:"gmail",
    port : 365,
    secure : true,  //true for 465 only , false for others
    auth:{
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS
    },
});

module.exports.sendOtpMail = async (to, otp) => {
    await transporter.sendMail({
        from : process.env.EMAIL_USER,
        to,
        subject : "CraveCart Password Reset OTP",
        html : `<h2>Reset your password</h2>
                <p>Use the otp below to reset your password</p>
                <p><b>${otp}</b></p>
                <p>The code will expire in 5 minutes.</p>
                <b>
                <p>If you didn't request this, you can safely ignore this mail.</p>
                <p><b>Thank you</b></p>  `
    });
}

module.exports.resendOtpMail = async (to, otp) => {
    await transporter.sendMail({
        from : process.env.EMAIL_USER,
        to,
        subject : "CraveCart Password Reset OTP (Resend)",
        html : `<h2>Reset your password</h2>
                <p>Use the otp below to reset your password</p>
                <p><b>${otp}</b></p>
                <p>The code will expire in 5 minutes.</p>
                <b>
                <p>If you didn't request this, you can safely ignore this mail.</p>
                <p><b>Thank you</b></p>  `
    });
}