import { body } from "express-validator";

export const productValidationRules = [
  body("name").notEmpty().withMessage("Name is required").trim(),
  body("description").notEmpty().withMessage("Description is required").trim().escape(),
  body("price").isNumeric().withMessage("Price must be a numeric value").notEmpty().withMessage("Price is required"),
  body("quantity")
    .isNumeric()
    .withMessage("Quantity must be a numeric value")
    .notEmpty()
    .withMessage("Quantity is required"),
];
