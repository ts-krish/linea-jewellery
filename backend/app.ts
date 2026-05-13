import cors from "cors";
import "dotenv/config";
import type { Request, Response } from "express";
import express from "express";
import {
  CartItemRouter,
  CartRouter,
  ProductImageRouter,
  ProductRouter,
  ReviewRouter,
  UserRouter,
} from "./routes";

const PORT = process.env.PORT;
const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL!, "http://localhost:3000"],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/uploads", express.static("uploads"));

app.use("/api", ProductRouter);
app.use("/api", UserRouter);
app.use("/api", CartRouter);
app.use("/api", CartItemRouter);
app.use("/api", ProductImageRouter);
app.use("/api", ReviewRouter);

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

export default app;
