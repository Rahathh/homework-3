import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  desc: String,
  category: String,
  tag: String,
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

export default MenuItem;