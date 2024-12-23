import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  content: {
    type: String,
    required: true,
    minlength: 10,
  },
  date: String,
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Technology", "Lifestyle", "Travel", "Food", "Other"],
  },
  tags: [String],
  isPublished: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Blog", blogSchema);
