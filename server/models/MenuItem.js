import mongoose from "mongoose"

const menuItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: String,
})

const MenuItem = mongoose.model("MenuItem", menuItemSchema)

export default MenuItem