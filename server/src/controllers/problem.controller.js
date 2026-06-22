const problemModel = require('../models/problem.model');


async function CreateProblem(req,res){

    try{
        const {title,platform,topics,questionUrl,difficulty,solvedDate,revision,note} = req.body;

        const problem = await problemModel.create({
            title,
            platform,
            questionUrl,
            topics,
            difficulty,
            solvedDate,
            revision,
            user:req.user.id,
            note
        })

        res.status(201).json({
            message:"problem created successfully",
            problem
        })
    }catch(err){
        console.error("error in adding question: ",err);
        res.status(500).json({message:"internal error during adding problem"});
    }

}

async function getAllProblems(req,res){

    try{
        const userId = req.user.id;

        const problems = await problemModel
            .find({ user: userId})  // find all the questions created by the user
            .limit(25)

        res.status(200).json({
            message: "All question fetched succesfully",
            problems
        })
    }catch(err){
        console.error("error in fetching all questions: ",err);
        res.status(500).json({message:"internal error in fetching all problems"})
    }

}

async function updateProblem(req,res){

    try{
        const problemId = req.params.id;  // fetch question id from the api link
        const userId = req.user.id;   // user id

        const updateData = await problemModel.findOneAndUpdate(
            {
                _id: problemId,  // match with problem id
                user: userId     // match with user id
            },
            { $set: req.body}, // set the changing data
            {
                returnDocument: 'after',  // return after the update
                runValidators:true        // run all validation rules
            }
        )

        if(!updateData){
            return res.status(404).json({message:"problem or user not find"})
        }

        res.status(200).json({
            message:"updated problem successfully",
            problem: updateData
        })
    }
    catch(err){

        // if the id of the problem is wrong then this error
        if (err.name === 'CastError') {
            return res.status(400).json({ message: "Invalid problem ID format" });
        }

        console.error("error in updating problem: ",err);
        res.status(500).json({message:"internal error in updating problem"})
    }

}

async function deleteProblem(req,res){

    try{
        const problemId = req.params.id;
        const userId = req.user.id;

        const problem = await problemModel.findOneAndDelete(
            { _id:problemId,
                user:userId
            }
        )

        if(!problem){
            return res.status(404).json({message:"problem or user not found"})
        }

        res.status(200).json({
            messsage:"problem deleted successfully"
        })

    }
    catch(err){

        // if the id of the problem is wrong then this error
        if (err.name === 'CastError') {
            return res.status(400).json({ message: "Invalid problem ID format" });
        }

        console.error("error in deleting problem: ",err);
        res.status(500).json({message:"internal error in deleting problem"})
    }
}

async function searchProblem(req,res){

    try{
        const problemId = req.params.id;
        const userId = req.user.id;

        const problem = await problemModel.findById(
            {
             _id: problemId,
             user: userId
            });

        if(!problem){
            return res.status(404).json({ message:"problem not found"});
        }

        res.status(200).json({
            message:"problem found successfully",
            problem
        })
    } catch(err){

        // if the id of the problem is wrong then this error
        if (err.name === 'CastError') {
            return res.status(400).json({ message: "Invalid problem ID format" });
        }

        console.error("error in finding problem: ",err);
        res.status(500).json({message:"internal error in finding problem"})
    }

}



module.exports = { CreateProblem,getAllProblems,updateProblem , deleteProblem, searchProblem}