const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username required"],
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:[true,"email required"],
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:[true, "password required"]
    },
    college:{
        type:String,
        required:[true, "college required"],
        trim:true
    },
    branch:{
        type:String,
        enum:["CSE","IT","ICE","MECH","CIVIL","ECE","MME","Other"],
        required:[true,"Branch required"]
    },
    graduationYear:{
        type:Number,
        required:[true,"Branch required"],
        min:2000,
        max:2100
    }
})

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;