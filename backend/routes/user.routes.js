const express = require("express");
const { isAuth } = require("../middlewares/isAuth.js");
const { getCurrentUser } = require("../controllers/user.controllers.js");
const Userrouter = express.Router();

Userrouter.get("/fetch-current-user",
    isAuth,
    getCurrentUser
);

module.exports = Userrouter;