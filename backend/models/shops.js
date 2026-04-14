const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    images : {
        type : [
            {
                url : String,
                alt : String,
                isPrimary : {
                    type : Boolean,
                    default : false
                }
            },
        ],
        validate : {
            validator : function(arr){
                return arr.length >=3 && arr.length <=12;
            },
            message : "A shop must have between 3 and 12 images."
        }
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Profile",
        required : true
    },
    address : {
        city : String,
        state : String,
        pincode : String,
        country : {
            type : String,
            default : "India"
        },
        completeAddress : String,
        coordinates : {
            lat : Number,
            lng : Number
        }
    },
    items : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "MenuItem",
        required : true
    }]
},{timestamps : true});

const Shop = mongoose.model("Shop", ShopSchema);
module.exports = Shop;