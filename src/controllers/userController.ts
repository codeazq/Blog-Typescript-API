import { TYPES } from "../types"
import IUserRepositoryInterface from "../repositories/interfaces/userInterface"
import { inject, injectable } from "inversify"
import { Request, Response, NextFunction } from "express"
import { IPostInputDTO } from "../dtos/postDTO"


@injectable()
export default class UserController {
    public userRepo: IUserRepositoryInterface

    constructor(@inject(TYPES.IUserRepositoryInterface) userRepo: IUserRepositoryInterface) {
        this.userRepo = userRepo;
    }

    public async index(req: Request, res: Response, next: NextFunction) {
        const users = await this.userRepo.all();
        res.status(200).send(users);
    }

    public async show(req: Request, res: Response, next: NextFunction) {
        const user = await this.userRepo.find(+req.params.id);
        res.status(200).send(user);
    }
}