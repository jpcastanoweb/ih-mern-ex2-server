const express = require("express")
const router = express.Router()
const { check } = require("express-validator")
const userController = require("./../controllers/userController")

// User Creation

router.post(
  "/register",
  [
    check("email", "Inser a valid email.").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
    check("username", "Username is required").not().isEmpty(),
  ],
  userController.registerUser
)

module.exports = router
