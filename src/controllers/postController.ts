import { TYPES } from "../types"
import IPostRepositoryInterface from "../repositories/interfaces/postInterface"
import { inject, injectable } from "inversify"
import { Request, Response, NextFunction } from "express"
import { IPostInputDTO } from "../dtos/postDTO"


@injectable()
export default class PostController {
    public postRepo: IPostRepositoryInterface

    constructor(@inject(TYPES.IPostRepositoryInterface) postRepo: IPostRepositoryInterface) {
        this.postRepo = postRepo;
    }

    public async index(req: Request, res: Response, next: NextFunction) {
        const posts = await this.postRepo.all();
        res.status(200).send(posts);
    }

    public async show(req: Request, res: Response, next: NextFunction) {
        const post = await this.postRepo.find(+req.params.id);
        res.status(200).send(post);
    }

    public async store(req: Request, res: Response, next: NextFunction) {
        const post = await this.postRepo.create(req.body as IPostInputDTO)
        res.status(200).send(post);
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        const post = await this.postRepo.update(+req.params.id, req.body as IPostInputDTO)
        res.status(200).send(post);
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        await this.postRepo.delete(+req.params.id);
        res.status(200).send();
    }
}