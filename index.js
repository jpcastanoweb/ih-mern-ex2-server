// Imports
const express = require("express")
const app = express()
const cors = require("cors")

const connectDB = require("./config/db")

// Middlewares
require("dotenv").config()
connectDB()

app.use(cors())

app.use(express.json({ extended: true }))

// Routes

app.use("/api/users", require("./routes/users"))
app.use("/api/auth", require("./routes/auth"))

// Server
app.listen(process.env.PORT, () => {
  console.log("Running on ", process.env.PORT)
})
