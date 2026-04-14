const Profile = require("../models/profiles.js");
const bcrypt = require("bcryptjs");
const genToken = require("../utils/token.js");
const { sendOtpMail, resendOtpMail } = require("../utils/mail.js");
const { urlencoded } = require("express");

//controller for sending the otp to the registered email.
module.exports.sendOtp = async (req,res) => {
    try{
        console.log("Send OTP controller called");
        const {email} = req.body;

        if(email == ""){
            return res.status(400).json({message : "Kindly enter the email."});
        }

        const user = await Profile.findOne({email});

        if(!user){
            return res.status(400).json({message : "User doesn't exist."});
        }
        if(user.authStatus == "google"){
            return res.status(400).json({message : "Your account is registered with google, kindly use google sign in."});
        }

        //math.random() -> 0 se 0.999.. generate krega
        // (*9000) -> 0 se 8999 tak number generate krega
        // (+1000) -> 1000 se 9999 k beech m koi b number generate krega (4 digit otp)
        const otp = Math.floor(1000 + Math.random()*9000).toString();

        user.resetOtp = await bcrypt.hash(otp,10);
        user.otpExpires = Date.now() + 5*60*1000; //expires otp after 5 minutes
        user.isOtpVerified = false;
        user.otpAttempts = 0;
        user.otpBlockedUntil = null;

        await user.save(); //now save all the changes made to the user
        console.log("Changes made to the user after otp generation : ",user);

        await sendOtpMail(email, otp);

        return res.status(200).json({message : "Otp sent on registered email."});
    }
    catch(err){
        console.log("Error while sending the otp : ",err);
        return res.status(500).json({message : `Error while sending the otp : ${err}`});
    }
}

//controller for verifying the otp that wether user entered the correct otp or not?
module.exports.verifyOtp = async (req,res) => {
    try{
        console.log("Verify OTP controller called");
        const {email, otp} = req.body;
        const user = await Profile.findOne({email});
        const actualotp = user.resetOtp;

        if(!user || user.otpExpires<Date.now()){
            return res.status(400).json({message : "Invalid/expired otp."});
        }

        if(user.otpBlockedUntil && user.otpBlockedUntil > Date.now()){
            return res.status(400).json("Too many attempts, try again later.");
        }
        
        const areOtpSame =  await bcrypt.compare(otp, user.resetOtp);
        if(!areOtpSame){
            user.otpAttempts += 1;
            if(user.otpAttempts >=3){
                user.otpBlockedUntil = Date.now() + 10*60*1000;
                user.otpAttempts = 0;
                await user.save();
                console.log("User blocked due to multiple failed otp attempts : ",user);
                return res.status(400).json({message : "Attempts succeeded the limit, try again after 10 minutes.",
                    redirect : "/signin"
                });
            }
            else {
                await user.save();
                console.log("Invalid otp attempt : ",user);
                return res.status(400).json({message : "Invalid otp."});
            }
        }

        user.isOtpVerified = true;
        user.resetOtp = undefined;
        user.otpExpires = undefined;

        await user.save();
        console.log("VERIFY OTP USER:", user.email, user.isOtpVerified);

        return res.status(200).json({message : "Otp verified successfully."});
    }
    catch(err){
        console.log("Error while verifying the otp : ",err);
        return res.status(500).json({message : `Otp verification error : ${err}`});
    }
}

//controller for reseting the password
module.exports.Resetpassword = async (req,res) => {
    try{
        console.log("Reset password controller called");
        const {newpassword, confirmnewpass,email} = req.body;
        const user = await Profile.findOne({email});

        if(!user){
            return res.status(400).json({message : "User doesn't exist."});
        }
        if(newpassword!=confirmnewpass){
            return res.status(400).json({message : "Passwords do not match."});
        }
        if(!user.isOtpVerified){
            return res.status(400).json({message : "Otp verification required."});
        }

        if(user.authStatus == "google"){
            user.password = await bcrypt.hash(newpassword,10);
            user.isOtpVerified = false;
            user.authStatus = "normal";
            await user.save();
            console.log("Password reset successfully for google authenticated user : ",user);
            return res.status(200).json({message : "Password updated successfully."});
        }
        else if(user.authStatus == "local" || user.authStatus == "normal"){
            const isSamePassword = await bcrypt.compare(newpassword, user.password);
            if(isSamePassword){
                return res.status(400).json({message : "Kindly create a password different than the current one."});
            }

            user.password = await bcrypt.hash(newpassword,10);
            user.isOtpVerified = false;
            await user.save();
            console.log("VERIFY OTP USER:", user.email, user.isOtpVerified);
            return res.status(200).json({user});
        }


    }
    catch(err){
        console.log("Error while resetting the password :",err);
        return res.status(500).json(err);
    }
}

module.exports.resendotp = async (req, res) => {
    try {
        const {email} = req.body;

        const user = await Profile.findOne({email});

        if(user.otpBlockedUntil && user.otpBlockedUntil > Date.now()){
            return res.status(429).json({message : "Too many attempts, try again later."});
        }
        if(user.lastOtpSent && Date.now() - user.lastOtpSent < 60000){
            return res.status(400).json({message : "Try again after 60 secs."});
        }

        const otp = Math.floor(1000 + Math.random()*9000).toString();

        user.resetOtp = await bcrypt.hash(otp,10);
        user.otpExpires = Date.now() + 5*60*1000; //expires otp after 5 minutes
        user.isOtpVerified = false;
        user.otpAttempts = 0;
        user.lastOtpSent = Date.now();

        await user.save(); //now save all the changes made to the user
        console.log("Changes made to the user after otp regeneration : ",user);

        await resendOtpMail(email, otp);

        return res.status(200).json({message : "Otp sent on registered email."});
    }
    catch(err){
        console.log("Error in backend while resending the otp : ",err);
        return res.status(500).json({message : "Error in backend (resendinf otp)"});
    }
}