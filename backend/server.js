import express from "express";
import dotenv from "dotenv";
import colors from "colors";

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./Middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("API IS RUNNING...");
});

// error handlers middleware

app.use(notFound);

app.use(errorHandler);

const port = process.env.PORT || 4000;

app.listen(
  port,
  console.log(
    `Server running on port ${port} in ${process.env.NODE_ENV} mode`.yellow
      .bold,
  ),
);
