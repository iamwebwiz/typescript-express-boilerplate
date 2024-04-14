import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import productRoutes from "./routes/products.route";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/products", productRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("TypeScript Express Boilerplate!");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  return res.status(500).send("Whoops! Something went wrong.");
});

app.use("*", (_, res: Response) => {
  return res.status(404).send("Whoops! Invalid endpoint.");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
