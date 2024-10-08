import express from "express"
import cors from "cors"
import morgan from "morgan"

const app = express()

app.use(cors(
    // {
    //     origin: process.env.CORS_ORIGIN,
    //     credentials: true
    // }
))
app.use(express.json())
app.use(morgan('dev'))

// import routes
import transactionRoutes from "./routes/transactions.routes.js"

// route declaration
app.use("/api/v1/transactions", transactionRoutes)
app.use("/api/v1/userLogin", )
export { app }