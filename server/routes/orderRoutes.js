import express from "express"
import Order from "../models/Order.js"

const router = express.Router()

router.get("/", async (req, res) => {
  const orders = await Order.find()

  res.json(orders)
})

router.post("/", async (req, res) => {
  const order = new Order(req.body)

  await order.save()

  res.json(order)
})
router.get("/test", async (req, res) => {
  const order = new Order({
    items: ["Test Item"],
    total: 20,
  })

  await order.save()

  res.json(order)
})
export default router