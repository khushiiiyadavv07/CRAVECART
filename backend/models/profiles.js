const { string, number } = require("joi");
const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    FullName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String
    },
    mobile : {
        type : String
    },
    role : {
        type : String,
        enum : ["user","owner","deliveryBoy"],
        required : true,
        default : "user"
    },
    authStatus:{
        type : String,
        enum : ["google","normal"],
        default : "local"
    },
    //for otp verification =>
    resetOtp : {
        type : String,
    },
    isOtpVerified : {
        type : Boolean,
        default : false
    },
    otpExpires : {
        type : Date
    },
    otpAttempts : {
        type : Number,
        default : 0
    },
    otpBlockedUntil : {
        type : Date
    },
    lastOtpSent :{
        type : Date
    }
},
{ timestamps : true});

const Profile = mongoose.model("Profile",ProfileSchema);

module.exports = Profile;