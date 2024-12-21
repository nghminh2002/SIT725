import express from "express";
import cors from "cors";
import { connectDB } from "./config/db-config.js";
import apiRoutes from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.use("/api", apiRoutes);

const port = process.env.PORT || 911;

app.listen(port, () => {
  console.log("App listening to: " + port);
});
