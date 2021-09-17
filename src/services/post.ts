import { TYPES } from "../types"
import IPostRepositoryInterface from "../repositories/interfaces/postInterface"
import { inject, injectable } from "inversify"
import { ICreatePostDTO, IUpdatePostDTO } from "../dtos/postDTO"


@injectable()
export default class PostService {
    public postRepo: IPostRepositoryInterface

    constructor(@inject(TYPES.IPostRepositoryInterface) postRepo: IPostRepositoryInterface) {
        this.postRepo = postRepo;
    }

    public async getAll() {
        return await this.postRepo.all();
    }

    public async find(id: number) {
        return await this.postRepo.find(id);
    }

    public async create(inputData: ICreatePostDTO) {
        return await this.postRepo.create(inputData);
    }

    public async update(id: number, inputData: IUpdatePostDTO) {
        return await this.postRepo.update(id, inputData);
    }

    public async delete(id) {
        await this.postRepo.delete(id);
    }
}