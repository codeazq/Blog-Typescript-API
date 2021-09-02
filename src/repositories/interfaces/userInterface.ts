import { IUserDTO, IUserInputDTO, IAuthUserDTO } from "../../dtos/userDTO"

export default interface IUserRepositoryInterface {
	all(): Promise<IUserDTO[]>
	find(id: number): Promise<IUserDTO>
	findByName(name: string): Promise<IUserDTO>
	findByNameWithPassword(name: string): Promise<IAuthUserDTO>
	create(data: IUserInputDTO): Promise<IUserDTO>
	update(id: number, data: IUserInputDTO): Promise<IUserDTO>
	delete(id: number): Promise<any>
}