import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
  items: Array,
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Order = mongoose.model("Order", orderSchema)

export default Order