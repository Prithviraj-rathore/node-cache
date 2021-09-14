const { Login , Signup , getuserdetail , updateuserdetail , updatepassword , getallusers , Users } = require("../controllers/user")

const {loginvalidators, userSignupValidator , updateprofileValidator , passwordvalidator} = require("../validators/index")

const {requireLogin} = require("../middlewares/requireLogin")

const express = require("express")

const router = express.Router()


router.post("/signup", userSignupValidator ,  Signup)

// router.post("/login" , Login)

router.post("/signin" , loginvalidators,  Login)

router.get("/getuserdetail", requireLogin , getuserdetail)

router.post("/updateuserdetail", requireLogin , updateprofileValidator,  updateuserdetail)

  router.post("/updatepassword", requireLogin , updatepassword)

router.get("/getallusers" , requireLogin , getallusers)

router.get("/apiusers" , requireLogin ,  Users )



module.exports = router