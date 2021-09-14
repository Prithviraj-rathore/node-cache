exports.loginvalidators = (req , res , next) => {
    // expressValidator method 

    req.check('email', 'Correct Email or key is required').notEmpty();
    req.check('email', 'Correct Email or key is required')
     .matches(/.+\@.+\..+/)
     .withMessage('please provide valid email address')
     .isLength({
         min: 2,
         max: 2000
     });

    req.check('password', 'Correct Password or key is required').notEmpty();
    


        const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {

        const firstError = errors.map(error => error.msg)[0];

        // BAD REQUEST Client error , invalid syntax of client 
        
        return res.status(400).json({ error: firstError , 
           error_code : "WRONG_CREDENTIALS"
        
        });
    }
    // proceed to next middleware
    next();
}

exports.updateprofileValidator = (req, res, next) => {
    // firstname
    req.check('firstname', 'Please write firstname or correct key ').notEmpty();
    req.check('firstname', 'firstname must be between 1 to 20 characters').isLength({
        min: 1,
        max: 20
    });
    // lastname 
    req.check('lastname', 'please write lastname or correct key  ').notEmpty();
    req.check('lastname', 'lastname must be between 1 to 20 characters').isLength({
        min: 1,
        max: 20
    });
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {

        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError  , error_code : "INVALID_REQUEST"});
    }
    // proceed to next middleware
    next();
};


exports.passwordvalidator = (req , res , next) => {

    req.check('password', 'Password or correct key is required').notEmpty();
    


       const errors = req.validationErrors();
   // if error show the first one as they happen
    if (errors) {
       const firstError = errors.map(error => error.msg)[0];
       return res.status(400).json({ error: firstError , error_code :"UNPROCESSABLE_REQUEST"});
    }
   // proceed to next middleware
   next();
}



exports.userSignupValidator = (req, res, next) => {
    // name is not null and between 4-10 characters
    req.check('firstname', 'first name  or key  is required').notEmpty();

    req.check('lastname', 'Last name or key  is required').notEmpty();

    // email is not null, valid and normalized
    req.check('email', 'Email must be between 3 to 32 characters or correct key ')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @ orr correct key ')
        .isLength({
            min: 4,
            max: 2000
        });
    // check for password
    req.check('password', 'Password or correct key  is required').notEmpty();
    req.check('password')
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number');
    
        req.check('role')
        .matches(/\d/)
        .withMessage('role must be a number in 1,2,3 or correct key ');
    
        // check for errors

    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    next();
};