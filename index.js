import express from "express";
import morgan from "morgan";
import { initDB } from "./utils/db.js";
import authRouter from "./routes/auth.routes.js";

initDB();

const app = express();

// Middleware
app.use(morgan("dev"));
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use("/api/auth", authRouter);

// General error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

// Error handling middleware
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});
