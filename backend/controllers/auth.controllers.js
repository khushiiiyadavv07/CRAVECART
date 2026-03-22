const Profile = require("../models/profiles.js");
const bcrypt = require("bcryptjs");
const genToken = require("../utils/token.js");

module.exports.signUpRoute = async (req,res) => {
    try{
        const {FullName, email, password, mobile, role="user"} = req.body;

        //if user exists then error return krdenge ki aap sign in kro
        let user = await Profile.findOne({email});
        if(user){
            return res.status(400).json({message : "User Already exist."});
        }
        //checking password length (should be in between 7-25)
        if(password.length<6 || password.length>25){
            return res.status(400).json({message : "Password must be of 6-25 characters."});
        }
        //checking mobile number (must be of exact 10 digits)
        if(mobile.length>10 || mobile.length<10){
            return res.status(400).json({message : "Mobile must be of exact 10 digits."});
        }

        //creating a hashed password
        const hashedPassword = await bcrypt.hash(password,10);

        user = await Profile.create({
            FullName,
            email,
            mobile,
            role,
            password : hashedPassword
        });

        const token = await genToken(user._id); //ye token hrr user ka different create kr denge

        //properties of signup
        res.cookie("token",token,{
            secure : false, //whie in development secure is false, and at the time of deployment secure is true
            sameSite : "strict", //samesite is strict while in the development phase
            maxAge : 7*24*60*60*1000, //expire date of cookie
            httpOnly : true
        });

        console.log("User saved in the database : ",user);

        return res.status(201).json(user);

    }
    catch(err){
        console.log("Error while signup :",err);
        return res.status(500).json(`Signup error ${err}`);
    }
}

module.exports.signInRoute = async (req,res) => {
    try{
        const {email, password} = req.body;

        const user = await Profile.findOne({email});
        //checking while the user exist or not ? if exist then okay otherwise return
        if(!user){
            return res.status(400).json({message : "User doesn't exist."});
        }

        //comparing both passwords throught bcryptjs
        const isMatch = await bcrypt.compare(password,user.password);

        //if both the passwords do not match
        if(!isMatch){
            return res.status(401).json({message : "Incorrect Password"});
        }

        //signin and signup dono k liye tokens ki need hoti h 
        const token = await genToken(user._id); //ye token hrr user ka different create kr denge

        //properties of signup
        res.cookie("token",token,{
            secure : false, //whie in development secure is false, and at the time of deployment secure is true
            sameSite : "strict", //samesite is strict while in the development phase
            maxAge : 7*24*60*60*1000, //expire date of cookie
            httpOnly : true
        });

        console.log("User trying to log in : ",user);
        
        return res.status(200).json(user);

    }
    catch(err){
        console.log("Error while signin :",err);
        return res.status(500).json(`Signin error ${err}`);
    }
}

module.exports.signOutRoute = async (req,res) => {
    try{
        res.clearCookie("token"); //kyunki humne yahi name signin ya signup krte hue diya tha cookie ko , so ab clear krte time b yahi denge
        return res.status(200).json({message : "Sign out successfully"});
    }
    catch(err){
        console.log(`Error in signout ${err}`);
        return res.status(500).json(`Sign out error ${err}`);
    }
}