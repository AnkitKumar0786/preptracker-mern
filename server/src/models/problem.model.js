const mongoose = require("mongoose")

const problemSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true
    },

    title:{
        type:String,
        required:true
    },

    platform:{
        type:String,
        enum:["Leetcode","Codeforces","CodeChef","GFG","Other"],
        required:true
    },

    questionUrl:{
        type:String,
        required:true
    },

    difficulty:{
        type:String,
        enum:["Easy","Medium","Hard"],
        required:true
    },

    topics:[{
        type:String
    }],

    solvedDate:{
        type:Date,
        default:Date.now
    },
    revision:{
        type:Boolean,
        default:false
    },
    note:{
        type:String,
        default:""
    }
})

const problemModel = mongoose.model("problem",problemSchema);

module.exports = problemModel;