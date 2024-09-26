import dotenv from "dotenv"
import { app } from "./app.js"
import connectDB from "./db/index.js"

dotenv.config({
    path: './.env'
})


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => console.log(`Listening Port: ${process.env.PORT}`))
    app.on("error", (err) => {
        console.log("Express server error", err);
        throw err;
    })
})
.catch(err => console.log("MongoDB connection failed: ", err))