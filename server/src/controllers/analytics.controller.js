const mongoose = require('mongoose');
const problemModel = require('../models/problem.model');


// we will MongoDB Aggregation Pipeline for the calculation


async function getDashboardStats(req,res){

    try{
        const userId = req.user.id;

        const [totalsolved, easy , medium, hard] = await Promise.all([
            problemModel.countDocuments({user: userId}),
            problemModel.countDocuments({user:userId, difficulty:"Easy"}),
            problemModel.countDocuments({user:userId, difficulty:"Medium"}),
            problemModel.countDocuments({user:userId, difficulty:"Hard"})
        ]);

        res.status(200).json({
            message:"Dashboard data",
            totalsolved,
            easy,
            medium,
            hard
        })
    }catch (err) {
        console.error("Dashboard Stats Error: ", err);
        res.status(500).json({ message: "Internal error fetching dashboard stats" });
    }
    
}

async function getDifficultyStats(req,res){

    try{
        const userId = new mongoose.Types.ObjectId(req.user.id);

        const stats = await problemModel.aggregate([
            {$match : { user:userId } }, // find the data whose id is userid
            
            {$group : {_id:"$difficulty", count: {$sum: 1} } } // this will group difficulty and add 1 when finds
        ])

        res.status(200).json({
            message:"Difficulty Stats",
            stats
        })
    }catch (err) {
        console.error("Difficulty Stats Error: ", err);
        res.status(500).json({ message: "Internal error fetching difficulty stats" });
    }
    
}

async function getTopicStats(req,res){

    try{
        const userId = new mongoose.Types.ObjectId(req.user.id);

        const stats = await problemModel.aggregate([
            {$match:{user:userId}},
            {$unwind: "$topics"},   // this will make documents of each element of topics
            {$group: { _id:"$topics", count: { $sum : 1 } } },  // count them
            {$sort: {count : -1}}  // sort from decending count
        ]);

        res.status(200).json({
            message:"Topics Stats",
            stats
        })
    }catch (err) {
        console.error("Topic Stats Error: ", err);
        res.status(500).json({ message: "Internal error fetching topic stats" });
    }
    
}

async function getMonthlyStats(req,res){

    try{
        const userId = new mongoose.Types.ObjectId(req.user.id);

        const stats = await problemModel.aggregate([
            {$match: { user: userId, solvedDate: { $exists:true, $ne:null } } },
            {
                $group:{
                    _id: {
                        month: {$month: "$solvedDate"},
                        year: {$year: "$solvedDate"}
                    },
                    count: { $sum : 1 }
                }
            },
            {$sort:{ "_id.year": 1, "_id.month":1 } }, // sort oldest to newest

            {
                $project: {
                    _id:0,
                    month:"$_id.month",
                    year:"$_id.year",
                    count: 1
                }
            }
        ])

        res.status(200).json({
            message:"monthly stats",
            stats
        });

    } catch (err) {
        console.error("Monthly Stats Error: ", err);
        res.status(500).json({ message: "Internal error fetching monthly stats" });
    }

}

module.exports = {getDashboardStats,getDifficultyStats,getTopicStats,getMonthlyStats};