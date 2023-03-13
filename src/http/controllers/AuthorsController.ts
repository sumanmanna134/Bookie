import { validate, validateOrReject } from "class-validator";
import { Request, Response } from "express";
import { ResponseUtil } from "../../../utils/Response";
import { AppDataSource } from "../../database/data-source";
import { Paginator } from "../../database/Paginator";
import { Author } from "../../entities/Author";
import { CreateAuthorDTO } from "../dtos/CreateAuthorDTO";
import { UpdateAuthorDTO } from "../dtos/UpdateAuthorDTO";

export class AuthController {
  async getAuthors(req: Request, res: Response) {
    const builder = await AppDataSource.getRepository(Author).createQueryBuilder().orderBy("id", "DESC");

    const { records: authors, paginationInfo } = await Paginator.paginate(builder, req);

    return ResponseUtil.sendResponse(res, "Fetch Authors successfully", authors, paginationInfo);
  }

  async getAuthor(req: Request, res: Response) {
    const { id } = req.params;
    const author = await AppDataSource.getRepository(Author).findOneByOrFail({
      id: Number(id),
    });

    return ResponseUtil.sendResponse(res, "Fetch Author successfully", author);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const authorData = req.body;
    authorData.image = req.file?.filename;
    const dto = new CreateAuthorDTO();
    Object.assign(dto, authorData);

    const errors = await validate(dto);
    if (errors.length > 0) {
      return ResponseUtil.sendError(res, "Invalid Data", 422, errors);
    }

    const repo = AppDataSource.getRepository(Author);
    const author = repo.create(authorData);
    await repo.save(author);
    return ResponseUtil.sendResponse(res, "New Author created successfully", author, 201);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const authorData = req.body;

    const dto = new UpdateAuthorDTO();
    Object.assign(dto, authorData);
    dto.id = parseInt(id);
    await validateOrReject(dto);

    const repo = AppDataSource.getRepository(Author);

    const author = await repo.findOneByOrFail({
      id: Number(id),
    });

    repo.merge(author, authorData);
    await repo.save(author);
    return ResponseUtil.sendResponse(res, "SuccessFully updated the author", author);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const repo = AppDataSource.getRepository(Author);
    const author = await repo.findOneByOrFail({
      id: Number(id),
    });

    await repo.remove(author);
    return ResponseUtil.sendResponse(res, "Successfully Deleted the author", null);
  }
}
