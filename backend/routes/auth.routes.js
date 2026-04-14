const express = require("express");
const { signUpRoute, signInRoute, signOutRoute, googleAuthentication, addMobile, googleAuthLogin } = require("../controllers/auth.controllers.js");
const { sendOtp, verifyOtp, Resetpassword, resendotp} = require("../controllers/otpverification.js");
const { isAuth } = require("../middlewares/isAuth.js");
const Authrouter = express.Router();

Authrouter.post("/signup",signUpRoute);
Authrouter.post("/signin", signInRoute);
Authrouter.get("/signout",signOutRoute);
Authrouter.post("/send-otp", sendOtp);
Authrouter.post("/verify-otp", verifyOtp);
Authrouter.post("/reset-password", Resetpassword);
Authrouter.post("/resend-otp",resendotp);
Authrouter.post("/google-auth", googleAuthentication);
Authrouter.post("/add-phone", isAuth, addMobile);
Authrouter.post("/google-auth-login", googleAuthLogin);

module.exports = Authrouter;