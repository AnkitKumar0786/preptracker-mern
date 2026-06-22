const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

async function authUser(req,res,next){

    const token = req.cookies?.token;

    if(!token){
        return res.status(401).json({message: "unauthorized"})
    }

    // now verify it using jwt.
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){
        return res.status(401).json({message:"unathorized"});
    }

}

module.exports = {authUser};