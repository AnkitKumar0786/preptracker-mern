const express = require('express')
const authController = require('../controllers/auth.controller')
const validationMiddleware = require('../middlewares/validation.middleware')
const authMiddleware = require('../middlewares/auth.middleware')

const router = express.Router();


router.post("/register",validationMiddleware.registerUserValidationRules,authController.registerUser);
router.post("/login",authController.loginUser)
router.post("/logout",authController.logoutUser)
router.patch("/updateprofile",authMiddleware.authUser,authController.ProfileUpdate);
router.get("/profile",authMiddleware.authUser,authController.viewProfile)

module.exports = router;