const noteModel = require('../models/note.model');


async function createNote(req,res){

    try{
        const {title,content} = req.body;

        const note = await noteModel.create({
            title,
            content,
            user:req.user.id
        })

        res.status(201).json({
            message:"note created successfully",
            note
        })
    }catch(err){
        console.error("error in note creating: ",err);
        res.status(500).json({ message: "internal error during creating note"})
    }

}

async function updateNote(req,res){

    try{
        const noteId = req.params.id;
        const userId = req.user.id;

        const updateNote = await noteModel.findOneAndUpdate(
            {
                _id:noteId,
                user:userId
            },
            {$set : req.body},
            {
                returnDocument:'after',
                runValidators:true
            }
        )


        if(!updateNote){
            return res.status(404).json({ message: "invalide note or user"});
        }

        res.status(200).json({
            message: "note updated successfully",
            note: updateNote
        })
    }catch(err){
        console.error("error in note updating: ",err);
        res.status(500).json({ message: "internal error during updating note"})
    }

}

async function deleteNote(req,res){

    try{
        const noteId = req.params.id;
        const userId = req.user.id;

        const deleted = await noteModel.findOneAndDelete(
            {
                _id:noteId, user:userId
            }
        )

        if(!deleted){
            return res.status(404).json({ message: "user or note not found"})
        }

        res.status(200).json({
            message:"note deleted",
            note:deleted
        })
    }catch(err){
        console.error("error in note deleting: ",err);
        res.status(500).json({ message: "internal error during deleting note"})
    }

}

async function getAllNote(req,res){

    try{
        const userId = req.user.id;

        const notes = await noteModel
        .find({user: userId})
        .limit(25)

        if(!notes){
            return res.status(404).json({message: "user not find"})
        }

        res.status(200).json({
            message:"all notes fetched successfully",
            notes:notes
        })
    }catch(err){
        console.error("error in fetching notes: ",err);
        res.status(500).json({ message: "internal error during fetching notes"})
    }
}

async function searchNote(req,res){

    try{
        const userId = req.user.id;
        const noteId = req.params.id;

        const note = await noteModel.findOne({user: userId, _id:noteId})

        if(!note){
            return res.status(404).json({message: "note or user not find"})
        }

        res.status(200).json({
            message:"note fetched successfully",
            note
        })
    }catch(err){
        console.error("error in fetching note: ",err);
        res.status(500).json({ message: "internal error during fetching note"})
    }
}

module.exports = { createNote, updateNote, deleteNote, getAllNote, searchNote}