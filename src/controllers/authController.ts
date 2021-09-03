import { TYPES } from "../types"
import { inject, injectable } from "inversify"
import { Request, Response, NextFunction } from "express"
import { IUserInputDTO, IAuthUserInputDTO } from "../dtos/userDTO"
import AuthService from "../services/auth"
import { myContainer } from "../inversify.config";


@injectable()
export default class AuthController {
    public authService: AuthService

    constructor() {
        this.authService = myContainer.resolve<AuthService>(AuthService);
    }

    public async register(req: Request, res: Response, next: NextFunction) {
        // check if userName is already registered
        const token = await this.authService.register(req.body as IAuthUserInputDTO)
        res.status(200).send(token);
    }

    public async signIn(req: Request, res: Response, next: NextFunction) {
        const token = await this.authService.signIn(req.body as IAuthUserInputDTO)
        res.status(200).send(token);
    }

    public async deactivate(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization.replace("Bearer", "");
        await this.authService.deactivate(token);
        res.status(200).send("User account decativated");
    }
}