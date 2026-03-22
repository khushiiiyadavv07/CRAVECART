const jwt = require("jsonwebtoken");

const genToken = async (userId) => {
    try{
        //yaha hum ek token create krenge jo hrr user ka different hoga jisse user signedin rhega website me
        const token = await jwt.sign(
            {userId},
            process.env.JWT_SECRET_KEY,
            {expiresIn : "7d"}
        );
        console.log(`Token generated for ${userId} is ${token}`);
        return token;
    }
    catch(err){
        console.log("Error while generating the token : ",err);
        return res.status(500).json(`Token error ${err}`);
    }   
};

module.exports = genToken;