const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())

const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/$/, "")

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || origin === allowedOrigins) {
            callback(null, true)
        } else {
            callback(new Error("CORS not allowed"))
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)



module.exports = app