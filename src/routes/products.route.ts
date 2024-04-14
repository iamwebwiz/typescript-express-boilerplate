import { Request, Response, Router } from "express";
import { Product } from "../models/product.model";
import { productValidationRules } from "../validators/product.rules";
import { validationResult } from "express-validator";

const router = Router();

let products: Product[] = [];

router.get("/", (req: Request, res: Response) => {
  res.json(products);
});

router.post("/", productValidationRules, (req: Request, res: Response) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  const product: Product = {
    id: products.length + 1,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
  };

  products.push(product);

  res.status(201).json(product);
});

router.get("/:id", (req: Request, res: Response) => {
  const product = products.find((product) => product.id === parseInt(req.params.id));

  if (!product) {
    return res.status(404).send("Product not found");
  }

  res.json(product);
});

router.put("/:id", productValidationRules, (req: Request, res: Response) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  const product = products.find((product) => product.id === parseInt(req.params.id));

  if (!product) {
    return res.status(404).send("Product not found");
  }

  product.name = req.body.name || product.name;
  product.description = req.body.description || product.description;
  product.price = req.body.price || product.price;
  product.quantity = req.body.quantity || product.quantity;

  res.json(product);
});

router.delete("/:id", (req: Request, res: Response) => {
  const productIndex = products.findIndex((product) => product.id === parseInt(req.params.id));

  if (productIndex === -1) {
    return res.status(404).send("Product not found");
  }

  products.splice(productIndex, 1);

  res.status(204).send("Product deleted");
});

export default router;
