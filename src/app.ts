import express, { Express, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authorsRoute from "./routes/authors";
import booksRoute from "./routes/books";
import { ErrorHandler } from "./http/middleware/ErrorHandler";

const app: Express = express();
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/authors", authorsRoute);
app.use("/books", booksRoute);
app.get("/hello", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Hello World",
  });
});

app.use("*", function (req: Request, res: Response) {
  // Invalid request
  res.json({
    success: false,
    message: "Invalid Route",
  });
});

app.use(ErrorHandler.handleErrors);

export default app;
