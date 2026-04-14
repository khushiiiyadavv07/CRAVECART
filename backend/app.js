const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectToDatabase = require("./config/database.js");
const cookieParser = require("cookie-parser");
const Authrouter = require("./routes/auth.routes.js");
const cors = require("cors");
const Userrouter = require("./routes/user.routes.js");

//this cors will b used for connecting the frontend to the backend
app.use(cors({
    origin : "http://localhost:5173", //ye browser ko bolega ki sirf isi url p requests accept krni h 
    credentials : true //this means hum backend me cookie send and recieve kr sakte h 
}));
app.use(express.json()); //req.body ko json format me convert krna
app.use(cookieParser()); // taaki token aaram s res.cookie me add ho jaaye

dotenv.config();
const port = process.env.PORT;

app.use("/api/auth", Authrouter);
app.use("/api/user", Userrouter);

app.get("/",(req,res)=>{
    res.send("CraveCart");
});

app.listen(port,()=>{
    connectToDatabase(),
    console.log(`App is listening on the port, ${port}`);
});