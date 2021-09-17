import { TYPES } from "../types"
import IUserRepositoryInterface from "../repositories/interfaces/userInterface"
import { inject, injectable } from "inversify"
import { IUserDTO } from "../dtos/userDTO"


@injectable()
export default class userService {
    public userRepo: IUserRepositoryInterface

    constructor(@inject(TYPES.IUserRepositoryInterface) userRepo: IUserRepositoryInterface) {
        this.userRepo = userRepo;
    }

    public async getAll(): Promise<IUserDTO[]> {
        return await this.userRepo.all();
    }

    public async find(id: number): Promise<IUserDTO> {
        return await this.userRepo.find(id);
    }
}