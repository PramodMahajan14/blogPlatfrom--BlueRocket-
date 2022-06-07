const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please enter Title!"]
      
    },
    body:{
        type:String,
        required:[true,"Please enter your think!"],
       
    },
    user_id:{
        type:String,
        required:true,
       
    },
    user_avatar:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
       
    },
    description:{
        type:String,
        required:true
    },
    ptype:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
       
    },
    purl:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true,
        default:Date.now
    },
    like:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model("blog",blogSchema)