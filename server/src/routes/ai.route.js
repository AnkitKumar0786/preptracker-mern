const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware');
const aiController = require('../controllers/ai.controller')

const router = express.Router();

router.post('/generate',authMiddleware.authUser,aiController.generateDSAnotes)

module.exports = router

