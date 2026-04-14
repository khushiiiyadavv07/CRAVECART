const Profile = require("../models/profiles.js");
const bcrypt = require("bcryptjs");
const genToken = require("../utils/token.js");
const { sendOtpMail } = require("../utils/mail.js");
const { isAuth } = require("../middlewares/isAuth.js");

module.exports.signUpRoute = async (req,res) => {
    try{
        const {FullName, email, password, repassword, mobile, role="user"} = req.body;

        if(FullName=="" || email == "" || mobile == "" || password == "" || repassword == ""){
            return res.status(400).json({message : "Please enter the details to continue."});
        }

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
        if(mobile.length<10){
            return res.status(400).json({message : "Mobile must be of 10 digits."});
        }
        if(password!=repassword){
            return res.status(400).json({message : "Passwords do not match."});
        }

        //creating a hashed password
        const hashedPassword = await bcrypt.hash(password,10);

        user = await Profile.create({
            FullName,
            email,
            mobile,
            role,
            password : hashedPassword,
            authStatus : "normal"
        });

        const token = await genToken(user._id); //ye token hrr user ka different create kr denge

        //properties of signup
        res.cookie("token",token,{
            secure : false, //whie in development secure is false, and at the time of deployment secure is true
            sameSite : "lax", //samesite is strict while in the development phase
            maxAge : 7*24*60*60*1000, //expire date of cookie
            httpOnly : true
        });

        //console.log("User saved in the database : ",user);
        //console.log("Token generated in signup route : ",token);

        return res.status(201).json({user});

    }
    catch(err){
        console.log("Error while signup :",err);
        return res.status(500).json(`Signup error ${err}`);
    }
}

module.exports.signInRoute = async (req,res) => {
    try{
        const {email, password} = req.body;

        if(email =="" || password == ""){
            return res.status(400).json({message : "Please enter the details to continue."});
        }

        const user = await Profile.findOne({email});
        //console.log("Sign in page :",user);
        //checking while the user exist or not ? if exist then okay otherwise return
        if(!user){
            return res.status(400).json({message : "User doesn't exist."});
        }

        if(user.authStatus == "google"){
            return res.status(400).json({message : "Your account is registered with google, kindly use google sign in."});
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
            sameSite : "lax", //samesite is strict while in the development phase
            maxAge : 7*24*60*60*1000, //expire date of cookie
            httpOnly : true
        });

        //console.log("Token generated in signin route : ",token);

        //console.log("User trying to log in : ",user);
        
        return res.status(200).json({user});

    }
    catch(err){
        console.log("Error while signin :",err);
        return res.status(500).json(`Signin error ${err}`);
    }
}

module.exports.signOutRoute = async (req,res) => {
    try{
        res.clearCookie("token"); //kyunki humne yahi name signin ya signup krte hue diya tha cookie ko , so ab clear krte time b yahi denge
        return res.status(200).json({user : null});
    }
    catch(err){
        console.log(`Error in signout ${err}`);
        return res.status(500).json(`Sign out error ${err}`);
    }
}

module.exports.googleAuthentication = async(req,res) => {
    try{
        const {FullName, email} = req.body;

        let user = await Profile.findOne({email});

        if(!user){
            user = await Profile.create({
                FullName,
                email,
                authStatus : "google"
            });
        }

        const token = await genToken(user._id); //ye token hrr user ka different create kr denge

        //properties of signup
        res.cookie("token",token,{
            secure : false, //whie in development secure is false, and at the time of deployment secure is true
            sameSite : "lax", //samesite is strict while in the development phase
            maxAge : 7*24*60*60*1000, //expire date of cookie
            httpOnly : true
        });

        //console.log("User saved in the database : ",user);
        //console.log("Token generated in Google authentication route : ",token);

        return res.status(201).json({user});

    }
    catch(err){
        console.log("Google authentication Backend error : ",err);
        return res.status(500).json(`Google Authentication Backend error : ${err}`);
    }
}

module.exports.addMobile = async (req,res) => {
    try{
        const {mobile} = req.body;
        const userid = req.user.userId;

        const user = await Profile.findOne({_id: userid});
        //console.log("user to add mobile number : ",user);

        if(!user){
            return res.status(400).json({message : "User doesn't exist."});
        }
        if(mobile == ""){
            return res.status(400).json({message : "Please enter the mobile number."});
        }

        const cleanMobile = mobile.replace(/\D/g, ''); // Remove non-digit characters

        if(cleanMobile.length !== 10){
            return res.status(400).json({message : "Mobile number must be exactly 10 digits."});
        }
        if(!cleanMobile.startsWith("9") && !cleanMobile.startsWith("8") && !cleanMobile.startsWith("7") && !cleanMobile.startsWith("6")){
            return res.status(400).json({message : "Invalid mobile number. Mobile number must start with 9, 8, 7, or 6."});
        }

        user.mobile = cleanMobile;
        await user.save();

        return res.status(201).json({user});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message : "Error while updating the details in backend"});
    }
}

module.exports.googleAuthLogin = async (req,res) => {
    try{
        const {email, FullName} = req.body;

        let user = await Profile.findOne({email});

        if(!user){
            return res.status(200).json({message : "User doesn't exist with this email, kindly sign up first."});
        }

        //signin and signup dono k liye tokens ki need hoti h 
        const token = await genToken(user._id); //ye token hrr user ka different create kr denge

        //properties of signup
        res.cookie("token",token,{
            secure : false, //whie in development secure is false, and at the time of deployment secure is true
            sameSite : "lax", //samesite is strict while in the development phase
            maxAge : 7*24*60*60*1000, //expire date of cookie
            httpOnly : true
        });

        //console.log("User trying to log in : ",user);
        //console.log("Token generated in Google auth login route : ",token);
        
        return res.status(200).json({user});


    }
    catch(err){
        console.log(err);
        return res.status(500).json({message : "Error occured in backend Route of Google Auth SignIn"});
    }
}
