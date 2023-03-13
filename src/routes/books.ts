import express from "express";
import { ErrorHandler } from "../http/middleware/ErrorHandler";
import { BooksController } from "../http/controllers/BooksController";
const router = express.Router();
const booksController = new BooksController();
router.get("/", ErrorHandler.catchErrors(booksController.get));
router.get("/:id", ErrorHandler.catchErrors(booksController.getBook));

export default router;
