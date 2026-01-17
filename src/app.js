import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import routes from "./routes/index.js";
import errorHandler from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

/* ---------- Core Middleware ---------- */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true
  })
);

app.use(cookieParser());

/* ---------- Routes ---------- */

app.use("/api", routes);
app.use("/api/auth", authRoutes);

/* ---------- Health Check ---------- */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "E-Commerce Backend API is running"
  });
});

/* ---------- Error Handler (LAST) ---------- */

app.use(errorHandler);

export default app;
