import express, { Request, Response } from "express";
import productRoutes from "./routes/products.route";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/products", productRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("TypeScript Express Boilerplate!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
