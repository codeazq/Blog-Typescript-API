import PostService from "../services/post"
import PostPolicy from "../policies/Post"
import { myContainer } from "../inversify.config"
import { injectable } from "inversify"
import { Request, Response, NextFunction } from "express"
import { ICreatePostDTO, IUpdatePostDTO } from "../dtos/postDTO"


@injectable()
export default class PostController {
    public postService: PostService

    public postPolicy: PostPolicy

    constructor() {
        this.postService = myContainer.resolve<PostService>(PostService);
        this.postPolicy = myContainer.resolve<PostPolicy>(PostPolicy);
    }

    public async index(req: Request, res: Response, next: NextFunction) {
        const posts = await this.postService.getAll();
        res.status(200).send(posts);
    }

    public async show(req: Request, res: Response, next: NextFunction) {
        const post = await this.postService.find(+req.params.id);
        res.status(200).send(post);
    }

    public async store(req, res: Response, next: NextFunction) {
        let createPostInputData = req.body;
        createPostInputData.user_id = req.user.id
        const post = await this.postService.create(createPostInputData as ICreatePostDTO);
        res.status(200).send(post);
    }

    public async update(req, res: Response, next: NextFunction) {
        try {
            await this.postPolicy.update(+req.user.id, +req.params.id)
            const post = await this.postService.update(+req.params.id, req.body as IUpdatePostDTO)
            res.status(200).send(post);
        } catch (error) {
            console.log(`error: ${error}`)
            res.status(401).send(error);
        }
    }

    public async delete(req, res: Response, next: NextFunction) {
        try {
            await this.postPolicy.delete(+req.user.id, +req.params.id)
            await this.postService.delete(+req.params.id);
            res.status(200).send();
        } catch (error) {
            res.status(401).send(error);
        }
    }
}