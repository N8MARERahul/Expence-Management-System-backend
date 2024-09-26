import express from "express"
import cors from "cors"


const app = express()

app.use(cors(
    // {
    //     origin: process.env.CORS_ORIGIN,
    //     credentials: true
    // }
))
app.use(express.json())

// import routes
import transactionRoutes from "./routes/transactions.routes.js"

// route declaration
app.use("/api/v1/transactions", transactionRoutes)


export { app }