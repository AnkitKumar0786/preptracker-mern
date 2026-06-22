const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const goalController = require("../controllers/goal.controller");

const router = express.Router();


router.post('/create',authMiddleware.authUser,goalController.createGoal)
router.get('/getall',authMiddleware.authUser,goalController.getallGoal)
router.patch('/update/:id',authMiddleware.authUser,goalController.updateGoal)
router.delete('/delete/:id',authMiddleware.authUser,goalController.deleteGoal)


module.exports = router;