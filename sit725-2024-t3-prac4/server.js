const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.port || 911;

mongoose
  .connect("mongodb://localhost:27017/sit-725", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: String,
});

const Blog = mongoose.model("Blog", blogSchema);

app.get("/api/blogs", async (req, res) => {
  try {
    const allBlogs = await Blog.find();
    res.json(allBlogs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching blogs" });
  }
});

app.post("/api/blogs", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newBlog = new Blog({
      title,
      content,
      date: new Date().toLocaleDateString(),
    });
    const savedBlog = await newBlog.save();
    res.json(savedBlog);
  } catch (error) {
    res.status(500).json({ error: "Error creating blog" });
  }
});

app.get("/api/lucky-number", (req, res) => {
  const number = Math.floor(Math.random() * 100) + 1;
  let message = "";

  if (number > 80) {
    message = "Wow! That's a very lucky number!";
  } else if (number < 20) {
    message = "Don't worry, tomorrow will be better!";
  }

  res.json({
    statusCode: 200,
    number: number,
    message: message,
  });
});

app.listen(port, () => {
  console.log("App listening to: " + port);
});
