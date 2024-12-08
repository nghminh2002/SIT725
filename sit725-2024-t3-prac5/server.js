const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db-config");
const apiRoutes = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to Database
connectDB();

// Routes
app.use("/api", apiRoutes);

const port = process.env.PORT || 911;

app.listen(port, () => {
  console.log("App listening to: " + port);
});
