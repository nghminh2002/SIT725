const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/add", (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ error: "Please provide valid numbers" });
  }

  const result = a + b;
  res.json({ result });
});

app.post("/multiply", (req, res) => {
  try {
    const { a, b } = req.body;

    if (typeof a !== "number" || typeof b !== "number") {
      return res.status(400).json({
        error: "Please provide valid numbers",
      });
    }

    const result = a * b;
    res.json({ result });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
