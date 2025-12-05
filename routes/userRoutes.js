const express = require("express");
const { registerUser, loginUser, currentUser, logoutUser } = require("../controllers/userController");
const {validateToken} = require('../middleware/validateTokenHandler')


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);
router.get("/logout", logoutUser);

module.exports = router;