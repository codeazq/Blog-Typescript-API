import { IPostDTO, IPostInputDTO } from "../../dtos/postDTO"

export interface IPostInterface {
    all(): Promise<IPostDTO[]>
    find(id: number): Promise<IPostDTO>
    create(data: IPostInputDTO): Promise<IPostDTO>
    update(id: number, data: IPostInputDTO): Promise<IPostDTO>
    delete(id: number): Promise<any>
}