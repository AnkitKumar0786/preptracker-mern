const goalModel = require('../models/goal.model')

async function createGoal(req,res){
    
    try{
        const userId = req.user.id;
        const {title,target,currentProgress} = req.body;

        const goal = await goalModel.create({
            user:userId,
            title,
            target,
            currentProgress
        })

        res.status(201).json({
            message:"goal created successfully",
            goal
        })
    }catch(err){
        console.error("error in goal creating: ",err);
        res.status(500).json({ message: "internal error during creating goal"})
    }

}

async function updateGoal(req,res){

    try{
        const goalId = req.params.id;
        const userId = req.user.id;

        const updateGoal = await goalModel.findOneAndUpdate(
            { _id:goalId, user:userId},
            {$set: req.body},
            {
                returnDocument:'after',
                runValidators:true
            }
        )

        if(!updateGoal){
            return res.status(404).json({ message: "user or goal not found"});
        }

        res.status(200).json({
            message:"goal updated successfully",
            Goal:updateGoal
        })
    }catch(err){
        console.error("error in goal updation: ",err);
        res.status(500).json({ message: "internal error during goal update"})
    }
}

async function getallGoal(req,res){

    try{
        const userId = req.user.id;

        const goal = await goalModel.find({user:userId})

        if(!goal){
            return res.status(404).json({ message: "goal or user not found"})
        }

        res.status(200).json({
            message:"goal fetched successfully",
            goal
        })
    }catch(err){
        console.error("error in fetching goal: ",err);
        res.status(500).json({ message: "internal error during fetching goal"})
    }

}

async function deleteGoal(req,res){

    try{
        const goalId = req.params.id;
        const userId = req.user.id;

        const deleted  = await goalModel.findOneAndDelete({_id:goalId, user:userId})

        if(!deleted){
            return res.status(404).json({ message: "goal or user not found"})
        }
        res.status(200).json({
            message:"goal deleted successfully",
            goal: deleted
        })
    }catch(err){
        console.error("error in goal deleting: ",err);
        res.status(500).json({ message: "internal error during deleting goal"})
    }
}

module.exports = { createGoal, updateGoal, getallGoal, deleteGoal}