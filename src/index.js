import dotenv from "dotenv"
import { app } from "./app.js"
import connectDB from "./db/index.js"

dotenv.config({
    path: './.env'
})

const port = process.env.PORT || 8000
connectDB()
.then(() => {
    app.listen(port, () => console.log(`Listening Port: ${port}`))
    app.on("error", (err) => {
        console.log("Express server error", err);
        throw err;
    })
})
.catch(err => console.log("MongoDB connection failed: ", err))