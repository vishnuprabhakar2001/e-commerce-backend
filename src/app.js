// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// import routes from "./routes/index.js";
// import errorHandler from "./middlewares/error.middleware.js";
// import authRoutes from "./routes/auth.routes.js";
// import productRoutes from "./routes/product.routes.js";
// import cartRoutes from "./routes/cart.routes.js";

// const app = express();

// /* ---------- Core Middleware ---------- */

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(
//   cors({
//     origin: "http://localhost:3000", 
//     credentials: true
//   })
// );

// app.use(cookieParser());

// /* ---------- Routes ---------- */

// app.use("/api", routes);
// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/cart", cartRoutes); 

// /* ---------- Health Check ---------- */

// app.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "E-Commerce Backend API is running"
//   });
// });

// /* ---------- Error Handler (LAST) ---------- */

// app.use(errorHandler);

// export default app;




import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import routes from "./routes/index.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

/* ---------- Core Middleware ---------- */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());

/* ---------- Routes ---------- */

app.use("/api", routes);

/* ---------- Health Check ---------- */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "E-Commerce Backend API is running",
  });
});

/* ---------- Error Handler (LAST) ---------- */

app.use(errorHandler);

export default app;
