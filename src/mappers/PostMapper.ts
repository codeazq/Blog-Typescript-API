import { IPostInputDTO, IPostDTO } from "../dtos/postDTO"

export default class PostMapper{
    public static toDTO(data: any): IPostDTO
    {
        return {
            id: data.id,
            title: data.title,
            body: data.body,
            user_id: data.user_id,
            created_at: data.created_at,
            updated_at: data.updated_at
        }
    }

    public static toInputDTO(data: any): IPostInputDTO
    {
        return {
            title: data.title,
            body: data.body,
            user_id: data.user_id
        }
    }
}