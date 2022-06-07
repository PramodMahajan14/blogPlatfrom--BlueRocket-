const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:[true,"Please enter your userid!"],
        trim:true
    },
    username:{
        type:String,
        required:[true,"Please enter your name!"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Please enter your email!"],
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please enter your password!"],
       
    },
    avatar:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
       
    },
    phone:{
        type:Number,
        default:"1234567890",
        trim:true
    },
    Profession:{
        type:String,
        default:"Web Developer and Designer"
    },
    bio:{
        type:String,
        default:"I practice what I post."
    },
    skills:["java","PHP","web Designer"],
    
  
   
})



module.exports = mongoose.model("users",userSchema)

// links :[{
//     github:{type:String},
//     facebook:{type:String},
//     linkedin:{type:String},
//     web:{type:String},

// }]