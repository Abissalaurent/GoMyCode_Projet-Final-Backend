// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");

// Route pour mettre à jour le profil
router.put("/profile", auth, userController.updateProfile);

module.exports = router;
