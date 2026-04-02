import "dotenv/config";
import type { Request, Response } from "express";
import express from "express";
import router from "./routes/product.ts";

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/", router);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from backend :) " });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
