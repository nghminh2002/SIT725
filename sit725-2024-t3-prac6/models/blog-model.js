import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: String,
});

export default mongoose.model("Blog", blogSchema);
