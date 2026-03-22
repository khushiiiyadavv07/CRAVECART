const mongoose = require("mongoose");

const connectToDatabase = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to the database.");
    }
    catch(err){
        console.log("Error while connecting to the database : ",err);
    }
};

module.exports = connectToDatabase;