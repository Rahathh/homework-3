import MenuItem from "./models/MenuItem.js";
import Order from "./models/Order.js";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://rahathassan2480:Platapush12_@hw4.a1ogscm.mongodb.net/?appName=hw4")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("API Running");
});

app.get("/api/menu", async (req, res) => {
  const items = await MenuItem.find();
  res.json(items);
});
app.get("/seed-menu", async (req, res) => {
  await MenuItem.deleteMany();

  await MenuItem.insertMany([
    {
      name: "Burrata & Heirloom Tomato",
      price: 16,
      desc: "Fresh burrata with heirloom tomatoes.",
      category: "starters",
      tag: "Vegetarian",
    },
    {
      name: "48oz Tomahawk Steak",
      price: 145,
      desc: "USDA Prime dry-aged steak.",
      category: "mains",
      tag: "Signature",
    },
    {
      name: "Valrhona Chocolate Fondant",
      price: 16,
      desc: "Warm chocolate cake with molten center.",
      category: "desserts",
      tag: "Signature",
    },
    {
      name: "Central Old Fashioned",
      price: 18,
      desc: "Smoked bourbon cocktail.",
      category: "drinks",
      tag: "Signature",
    },
  ]);

  res.send("Menu Seeded");
});
app.post("/api/orders", async (req, res) => {
  const { items, total } = req.body;

  const newOrder = new Order({
    items,
    total,
  });

  await newOrder.save();

  res.json({
    message: "Order saved",
    order: newOrder,
  });
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});