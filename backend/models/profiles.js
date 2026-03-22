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
        type : Number,
        unique : true,
        required : true
    },
    role : {
        type : String,
        enum : ["user","owner","deliveryBoy"],
        required : true
    }
},
{ timestamps : true});

const Profile = mongoose.model("Profile",ProfileSchema);

module.exports = Profile;