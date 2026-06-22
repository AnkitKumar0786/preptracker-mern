const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const problemController = require('../controllers/problem.controller')

const router = express.Router();

router.post("/create",authMiddleware.authUser,problemController.CreateProblem);
router.get("/getall",authMiddleware.authUser,problemController.getAllProblems);
router.patch("/update/:id",authMiddleware.authUser,problemController.updateProblem);
router.delete("/delete/:id",authMiddleware.authUser,problemController.deleteProblem);
router.get("/search/:id",authMiddleware.authUser,problemController.searchProblem);

module.exports = router;