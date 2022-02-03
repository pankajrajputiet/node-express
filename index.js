//init code
require("dotenv").config();
const database = require('./database');
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const userController = require("./controllers/user");


//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use("/api/user",userController);

//de routes
app.all("/",(req,res)=>{
    return res.json(
        { status : true,
            messages : "Index Page is working............."
    });
});

// start server_request
app.listen(port,(error)=>{
if(error){
    console.error("getting error");
}
console.log(`port is listening at port : ${port}`);
})
