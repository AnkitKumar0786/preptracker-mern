const mongoose = require('mongoose')

const goalSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user"
    },
    title:{
        type:String,
        required:true
    },
    target:{
        type:String,
        required:true
    },
    currentProgress:{
        type:String,
        required:true
    }
})


const goalModel = mongoose.model("goals",goalSchema)

module.exports = goalModel;