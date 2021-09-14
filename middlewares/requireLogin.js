
const jwt = require('jsonwebtoken')

const User = require("../models/users")

const JWT_SECRET = "kjhgjrghklegekle"


const {keyexists}  = require("../nodecache/nodeCache")
exports.requireLogin = (req , res , next) => {

    const {authorization} = req.headers
    //authorization === Bearer ewefwegwrherhe

    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMxMDA5NjI1fQ.HxpdyiAJsMkraa_t1bwX2eI4mg8xdjtfMSRC_D9wJwU"
    if(!authorization){
       // Unauthorized client request 
       return res.status(401).json({error:"you must be logged in" , error_code : "ACCESS_DENIED"})
    }

    const token = authorization.replace("Bearer ","")

    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        
        if(err){
         return   res.status(401).json({error:"please provide valid token" , error_code : "ACCESS_DENIED"})
        }

        const {_id , key } = payload 





        // get the data from the user model
          
        
        User.findOne({_id : _id}).then((savedUser) =>{

              
            
        if(keyexists(key)){

          return res.status(401).json({error:"Sorry! Token Has expired" , error_code : "ACCESS_DENIED"})
          
        }
              req.user = savedUser;

            //   Object.assign(req.user,{token :  token})
              
              next();

        }).catch((error) =>{

            console.log(error)
        })
    })
}