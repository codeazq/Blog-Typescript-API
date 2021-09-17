import { IPostDTO, ICreatePostDTO, IUpdatePostDTO } from "../../dtos/postDTO"

export default interface IPostRepositoryInterface {
    all(): Promise<IPostDTO[]>
    find(id: number): Promise<IPostDTO>
    create(data: ICreatePostDTO): Promise<IPostDTO>
    update(id: number, data: IUpdatePostDTO): Promise<IPostDTO>
    delete(id: number): Promise<any>
}