import express from "express";
import { ErrorHandler } from "../http/middleware/ErrorHandler";
import { AuthController } from "../http/controllers/AuthorsController";
import { FileUploader } from "../http/middleware/Fileuploader";
const router = express.Router();
const authorsController = new AuthController();
router.get("/", ErrorHandler.catchErrors(authorsController.getAuthors));
router.get("/:id", ErrorHandler.catchErrors(authorsController.getAuthor));

router.post(
  "/",
  FileUploader.upload("image", "authors", 2 * 1024 * 1024),
  ErrorHandler.catchErrors(authorsController.create)
);

router.put("/:id", ErrorHandler.catchErrors(authorsController.update));
router.delete("/:id", ErrorHandler.catchErrors(authorsController.delete));

export default router;
