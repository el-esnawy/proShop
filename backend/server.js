import express from "express";
import dotenv from "dotenv";

import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./Middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

app.get("/", (req, res) => {
  res.send("API IS RUNNING...");
});

// error handlers middleware

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 4000;

app.listen(port, console.log(`Server running on port ${port} in ${process.env.NODE_ENV} mode`.yellow.bold));
