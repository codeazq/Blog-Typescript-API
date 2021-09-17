import { TYPES } from "../types"
import IUserRepositoryInterface from "../repositories/interfaces/userInterface"
import { inject, injectable } from "inversify"
import { Request, Response, NextFunction } from "express"
import { ICreatePostDTO } from "../dtos/postDTO"
import UserService from "../services/user"
import { myContainer } from "../inversify.config"


@injectable()
export default class UserController {
    public userService: UserService

    constructor() {
        this.userService = myContainer.resolve<UserService>(UserService);
    }

    public async index(req: Request, res: Response, next: NextFunction) {
        const users = await this.userService.getAll();
        res.status(200).send(users);
    }

    public async show(req: Request, res: Response, next: NextFunction) {
        const user = await this.userService.find(+req.params.id);
        res.status(200).send(user);
    }
}