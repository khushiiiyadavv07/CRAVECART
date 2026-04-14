const Profile = require("../models/profiles.js");

module.exports.getCurrentUser = async (req,res) => {
    try{
        //console.log("User in fetch controller :",req.user);
        //console.log("Token in fetch controller :",req.cookies.token);
        const userId = req.user.userId;
        //console.log("UserId in getCurrentUser controller :",userId);
        //console.log("Cookies in getCurrentUser controller :",req.cookies);  
        if(!userId){
            return res.status(400).json({message : "UserId not found"});
        }

        const user = await Profile.findById(userId);
        if(!user){
            return res.status(400).json({message : "User not found"});
        }

        //console.log("Result sent to the frontend :",user);
        return res.status(200).json({user});
    }
    catch(err){
        return res.status(500).json({message : "Error in the getCurrentUser controller."});
    }
}