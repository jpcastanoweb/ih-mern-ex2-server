const User = require("./../models/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const { validationResult } = require("express-validator")

exports.registerUser = async (req, res) => {
  // Check validations
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      msg: errors.array(),
    })
  }

  const { username, email, password } = req.body

  try {
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    })

    //User created, creating json web token

    // CREATE A JWT
    const payload = {
      user: {
        id: newUser._id,
      },
    }

    //SIGN THE JSON WEB TOKEN
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 360000,
      },
      (error, token) => {
        if (error) throw error

        res.json({ token })
      }
    )
  } catch (error) {
    console.log("Error creating new user: ", error.message)
    return res.json(error)
  }
}
