const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true
    },
    title:{
        type:String,
    },
    content:{
        type:String,
    }

})

const noteModel = mongoose.model("notes",noteSchema);

module.exports = noteModel;