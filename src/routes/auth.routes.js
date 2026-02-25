const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const ipRestriction = require("../middleware/ipRestriction.middleware");
const rateLimiter = require("../middleware/rateLimiter.middleware");

// Login endpoint restricted by IP + rate limit
router.post("/register", authController.register);
router.post("/verify",authController.verify)
module.exports = router;