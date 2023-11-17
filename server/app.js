import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS with specific origin and credentials
const corsOptions = {
  origin: process.env.FRONTEND_URL, // Replace with your actual frontend origin
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(morgan("dev"));

app.use("/ping", (req, res) => {
  res.send("pong");
});

app.use("/api/v1/user", userRoutes);

app.use("/api/v1/courses", courseRoutes);

app.use("/api/v1/payments", paymentRoutes);

app.all("*", (req, res) => {
  res.status(404).send("OOPS !! 404 Page Not Fount");
});

app.use(errorMiddleware);

export default app;
