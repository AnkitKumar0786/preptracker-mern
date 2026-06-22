const {body,validationResult} = require('express-validator');

// function(middleware) that will check that all condition are true or not
function validateResult(req,res,next){

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    };
    next();

}


const registerUserValidationRules = [

    body("username")
        .isString()
        .withMessage("username must be a string")
        .isLength({min:3,max:20})
        .withMessage("username must contain 3 character and atmost 20"),

    body("email")
        .isEmail()
        .withMessage("Enter a valid email"),

    body("password")
        .isLength({min:6})
        .withMessage("password must contain 6 char"),

    body("graduationYear")
        .isInt({ min: 2000, max: 2100 })
        .withMessage("Graduation year must be a valid 4-digit year"),
    validateResult

]

module.exports = {registerUserValidationRules}