import { IUserDTO, IUserInputDTO, IAuthUserDTO } from "../dtos/userDTO";

export default class UserMapper {
    public static toDTO(data: any): IUserDTO
    {
        return {
            id: data.id,
            name: data.name,
            isActive: data.isActive,
            created_at: data.created_at,
            updated_at: data.updated_at
        }
    }

    public static toInputDTO(data: any): IUserInputDTO
    {
        return {
            name: data.name,
            password: data.password || null,
        }
    }

    public static toAuthDTO(data: any): IAuthUserDTO
    {
        return {
            id: data.id,
            name: data.name,
            password: data.password,
        }
    }
}