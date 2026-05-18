import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import menuRoutes from "./routes/menuRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/menu", menuRoutes)
app.use("/api/orders", orderRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err))

app.get("/", (req, res) => {
  res.send("Backend is running")
})

app.listen(5000, () => {
  console.log("Server running on port 5000")
})