import { Request, Response } from "express";
import { ResponseUtil } from "../../../utils/Response";
import { AppDataSource } from "../../database/data-source";
import { Paginator } from "../../database/Paginator";
import { Book } from "../../entities/Book";

export class BooksController {
  async get(req: Request, res: Response) {
    const builder = AppDataSource.getRepository(Book).createQueryBuilder().orderBy("id", "DESC");
    const { records: books, paginationInfo } = await Paginator.paginate(builder, req);
    return ResponseUtil.sendResponse<Book>(res, "Fetched books successfully", books, paginationInfo);
  }

  async getBook(req: Request, res: Response) {
    const { id } = req.params;
    const book = await AppDataSource.getRepository(Book).findOneByOrFail({
      id: Number(id),
    });

    return ResponseUtil.sendResponse<Book>(res, "Fetched Book successfully", book);
  }
}
