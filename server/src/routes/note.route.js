const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const noteController = require('../controllers/note.controller')

const router = express.Router();

router.post("/create",authMiddleware.authUser, noteController.createNote)
router.patch("/update/:id",authMiddleware.authUser, noteController.updateNote)
router.delete("/delete/:id",authMiddleware.authUser, noteController.deleteNote)
router.get("/getall",authMiddleware.authUser, noteController.getAllNote)
router.get("/search/:id",authMiddleware.authUser, noteController.searchNote)


module.exports = router;