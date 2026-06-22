const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const analyticController = require('../controllers/analytics.controller');

const router = express.Router();

router.get("/dashboard",authMiddleware.authUser,analyticController.getDashboardStats)
router.get("/difficulty",authMiddleware.authUser,analyticController.getDifficultyStats)
router.get("/topics",authMiddleware.authUser,analyticController.getTopicStats)
router.get("/monthly",authMiddleware.authUser,analyticController.getMonthlyStats)


module.exports = router;