import { injectable, inject } from "inversify";
import IUserRepositoryInterface from "../repositories/interfaces/userInterface";
import { TYPES } from "../types";
import { IAuthUserInputDTO } from "../dtos/userDTO";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

@injectable()
export default class AuthService{
    public userRepo: IUserRepositoryInterface

    constructor(@inject(TYPES.IUserRepositoryInterface) userRepo: IUserRepositoryInterface) {
        this.userRepo =  userRepo
    }

    public async register(inputData: IAuthUserInputDTO) {
        const salt = await bcrypt.genSalt()
        inputData.password = await bcrypt.hash(inputData.password, salt)
        const user = await this.userRepo.create(inputData)
        const token = this.generateToken(user.id)
        return token
    }

    public async signIn(inputData: IAuthUserInputDTO) {
        const user = await this.userRepo.findByNameWithPassword(inputData.userName)
        try {
            if(await bcrypt.compare(inputData.password, user.password)) {
                return this.generateToken(user.id)
            }
        } catch (error) {
            throw new Error('Unauthorized: password did not match')
        }
    }

    public async deactivate(token: string) {
        const payload = this.getTokenPayload(token)
        const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString())
        const userId = decodedPayload.sub
        return await this.userRepo.delete(userId)
    }

    private async generateToken(userId: number) {
        return jwt.sign({
            iss: process.env.APP_NAME || 'blogAPI',
            sub: userId,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 1)
        }, process.env.passportSecret || 'x?@$xqXVZp?7P#PG')
    }

    private getTokenPayload(token) {
        return token.split('.')[1]
    }
}