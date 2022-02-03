//init code
require("dotenv").config();
const mongoose = require("mongoose");
const assert = require('assert');
const db_url = process.env.DB_URL;

// CONNECTION_CREATED
const obj = { 
    useNewUrlParser : true, 
    useUnifiedTopology : true,
    useCreateIndex : true
};
mongoose.connect(db_url,(error,db)=>{

    //check errors
    assert.equal(error,null,"DB connection fail......");
//if(error) throw error;
//ok
console.log("connected to database............");
//console.log(db);
})