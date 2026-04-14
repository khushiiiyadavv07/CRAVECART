const jwt = require("jsonwebtoken");

module.exports.isAuth = async (req,res,next) => {
    try{
        //yaha p hum req object me se token access krenge then uss token ki help s user id extract krenge and then user id ki help s user find krke frontend me send
        //console.log("IsAuth middleware called");
        //console.log("All Cookies : ",req.cookies);

        const token = req.cookies.token;
        const secretkey = process.env.JWT_SECRET_KEY;

        //console.log("Token extracted in isAuth middleware :",token);

        if(!token){
            return res.status(401).json({message : "Unauthorized : No token provided"});
        }

        const decoded = jwt.verify(token, secretkey);

        req.user = decoded; //user id extract kr lenge aur usko req object me store kr lenge
        next();

    }
    catch(err){
        console.log("Error in authentication middleware :",err);
        return res.status(401).json({message : "Error in the authentication middleware"});
    }
}
