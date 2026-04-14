const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
    name : {
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
            }
        ],
        validate : {
            validator : function(arr){
                return arr.length >=1 && arr.length <=3;
            },
            message : "A menu item must have between 1 and 3 images."
        }
    },
    shop : {
        type :mongoose.Schema.Types.ObjectId,
        ref : "Shop",
        required : true
    },
    category : {
        type : String,
        enum : ["Beverages", 
            "Snacks", 
            "Main Course", 
            "Desserts",
            "Pizzas",
            "Burgers",
            "Sandwiches",
            "South Indian",
            "Sushis",
            "North Indian",
            "Italian",
            "Chinese",
            "Fast Food",
            "Salads", 
            "Soups", 
            "Sides", 
            "Breakfast", 
            "Lunch", 
            "Dinner",
            "Others"
        ],
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    foodType : {
        type : String,
        enum : ["Veg", "Non-Veg", "Vegan"],
        required : true
    }
},{timestamps : true});

const MenuItem = mongoose.model("MenuItem", MenuItemSchema);
module.exports = MenuItem;