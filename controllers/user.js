 
const User = require("../models/users")

const JWT_SECRET = "kjhgjrghklegekle"

const jwt = require("jsonwebtoken")

const bcrypt = require('bcryptjs')

let {addkeyinCache} = require("../nodecache/nodeCache")


const axios = require('axios')
exports.Login = (req , res) =>{
  
  const {email,password} = req.body
    if(!email || !password){
       return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfully signed in"})
               const token = jwt.sign({_id:savedUser._id , key : savedUser.key},JWT_SECRET)
               

               const {firstname , lastname , email } = savedUser
               res.json({token})
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }).catch(err=>{

      console.log(err)
    })
  }





exports.Signup = (req,res)=>{
  const {firstname,lastname ,email,password , role , key } = req.body 
  if(!email || !password || !firstname || !lastname){
     return res.status(422).json({error:"please add all the fields"})
  }
  User.findOne({email:email})
  .then((savedUser)=>{
      if(savedUser){
        return res.status(422).json({error:"user already exists with that email"})
      }
      bcrypt.hash(password,12)
      .then(hashedpassword=>{
            const user = new User({
                firstname , 
                lastname , 
                email ,
                password:hashedpassword,
                role , 
                key
                
                
            })
            user.save()
            .then(user=>{
                // transporter.sendMail({
                //     to:user.email,
                //     from:"no-reply@insta.com",
                //     subject:"signup success",
                //     html:"<h1>welcome to instagram</h1>"
                // })
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
      })
     
  })
  .catch(err=>{
    console.log(err)
  })
}



exports.getuserdetail =  (req, res) => {

  
  // console.log(mycache.key1)
res.json({

  user : req.user
})


}


exports.updateuserdetail = (req, res) => {

const filter = {_id : req.user._id}


let update = {

firstname : req.body.firstname , 

lastname : req.body.lastname 

}


User.findOneAndUpdate(filter , update).then((savedUser) => {

  req.user =  savedUser

  return res.json({ user : req.user})
}).catch(err=>{

  console.log(err)
})

}


// exports.updatepassword = function(req, res){

//   const {newpassword} = req.body
  
             
//            addkeyinCache(req.user.key)
//            // Now we add the key in set 
//           // addkeyinCache(savedUser._id)



//            const filter = {_id : req.user._id}
         

//           const update = {
//           password : newpassword ,
//           key : Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
//           }

       
//         User.findOneAndUpdate(filter , update).then((savedUser) => {

//          req.user =  savedUser

//   return res.json({ user : req.user})
// }).catch(err=>{

//   console.log(err)
// })
// }


  
exports.updatepassword = function(req, res){

  const {newpassword} = req.body
  
             
           addkeyinCache(req.user.key)
           // Now we add the key in set 
          // addkeyinCache(savedUser._id)
          

          bcrypt.hash(newpassword,12)
          .then(hashedpassword=>{
            const filter = {_id : req.user._id}
         

          let update = {
          password : hashedpassword ,
          key : Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
          }

       
        User.findOneAndUpdate(filter , update).then((savedUser) => {

         req.user =  savedUser

  return res.json({ user : req.user})
}).catch(err=>{

  console.log(err)
})


          }).catch(err=>{

            console.log(err)
          })
}


  




exports.getallusers= (req, res) => {

  if(req.user.role == 2){

    // Now we can just get the other users 

    User.find( { role: { $lte: 2} } ).then((savedUser)=>{


     return   res.json({ user: savedUser})
    }).catch(err=>{

      console.log(err)
    })

  }


  
  if(req.user.role == 3){

    // Now we can just get the other users 

    User.find( { role: { $lte: 3} } ).then((savedUser)=>{


     return  res.json({ user: savedUser})
    }).catch(err=>{

      console.log(err)
    })

  }


  User.find( { role: { $lte: 1} } ).then((savedUser)=>{


     res.json({ user: savedUser})
   }).catch(err=>{

    console.log(err)
   })
}



exports.Users = async (req, res) =>{


try{
const mongousersdata = await User.find()
const apiusersdata = await axios.get("https://jsonplaceholder.typicode.com/users")


const alluserdata = [...mongousersdata , ...apiusersdata.data]

return res.json({allusers : alluserdata})

}

catch(err){

res.json({error: err.message})

}


}
