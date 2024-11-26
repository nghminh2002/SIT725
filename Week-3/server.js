const express = require("express");

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.port || 911;

app.use(express.json());
app.use(express.static("public"));

let blogs = [];

app.get("/api/blogs", (req, res) => {
  res.json(blogs);
});

app.post("/api/blogs", (req, res) => {
  const { title, content } = req.body;
  const newBlog = {
    id: Date.now(),
    title,
    content,
    date: new Date().toLocaleDateString(),
  };
  blogs.push(newBlog);
  res.json(newBlog);
});

app.listen(port, () => {
  console.log("App listening to: " + port);
});
