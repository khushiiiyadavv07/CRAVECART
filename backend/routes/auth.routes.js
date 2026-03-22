const express = require("express");
const { signUpRoute, signInRoute, signOutRoute } = require("../controllers/auth.controllers.js");
const Authrouter = express.Router();

Authrouter.post("/signup",signUpRoute);
Authrouter.post("/signin", signInRoute);
Authrouter.get("/signout",signOutRoute);

module.exports = Authrouter;