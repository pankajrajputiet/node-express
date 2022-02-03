// init code
const router = require("express").Router();
const bodyParser = require("body-Parser");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("./../models/user");

//middlewares setups
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// routes goes here


//default router
router.all("/", (req, res) => {
    return res.json({
        status: true,
        message : "User Controller working......."
    });
});

// create new user route
router.post("/createNew",
[
    // check not empty fields
    check("username").not().isEmpty().trim().escape(),
    check("password").not().isEmpty().trim().escape(),    
    check("email").isEmail().normalizeEmail()
],
function(req,res){ 
    // check validationAction
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            status : false,
            message : "Form validation error", 
            errors : errors.array()
        });
    }
    // hash password code
    const hashedPassword = bcrypt.hashSync(req.body.password,10);

    User.create(
        {
            username : req.body.username,
            email : req.body.email,
            password : hashedPassword
    },
    function(error,result){
        // check errors
        if(error){
            return res.json({
                status :false,
                message : "fail to connect DB",
                error :error
            });
        }
        // everything okk....
        return res.json(
            {
                status : true, 
                message : "connected to database",
                result : result
            });
    }
    );
}
);



// moduleExports
module.exports = router;
