import express from "express";
import cors from "cors";
import { connectDB } from "./config/db-config.js";
import apiRoutes from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.use("/api", apiRoutes);

const messages = [
  "Wish you a happy holiday!",
  "Christmas is coming, hohoho",
  "Happy new year!",
  "Wow, the weather is so nice, isn't it! Hope you enjoy it!",
  "How do you feel today?",
];

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.emit("welcome", "Welcome to Milly's blog!");

  const messageInterval = setInterval(() => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    socket.emit("funMessage", randomMessage);
  }, 2000);

  socket.on("disconnect", () => {
    console.log("User disconnected");
    clearInterval(messageInterval);
  });
});

const port = process.env.PORT || 911;

httpServer.listen(port, () => {
  console.log("App listening to: " + port);
});

export { app, io };
