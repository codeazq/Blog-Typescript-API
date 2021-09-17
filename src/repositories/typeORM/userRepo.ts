import { injectable } from "inversify";
import IUserRepositoryInterface from "../interfaces/userInterface";
import { IUserDTO, IUserInputDTO, IAuthUserDTO } from "../../dtos/userDTO"
import { User } from "../../entity/User";
import UserMapper from "../../mappers/userMapper";


@injectable()
export default class UserRepository implements IUserRepositoryInterface {
    public async all(): Promise<IUserDTO[]> {
        const users = await User.find();
        users.forEach(user => {
            return UserMapper.toDTO(user);
        });
        return users;
    }

    public async find(id: number): Promise<IUserDTO> {
        const user = await User.findOne(id);
        return UserMapper.toDTO(user);
    }

    public async findByName(name: string): Promise<IUserDTO> {
        const user = await User.findOne(name, { where: { name: 1}});
        return UserMapper.toDTO(user);
    }

    public async findByNameWithPassword(name: string): Promise<IAuthUserDTO> {
        const user = await User.findOne(name, { where: { name: 1}});
        return UserMapper.toAuthDTO(user);
    }

    public async create(data: IUserInputDTO): Promise<IUserDTO> {
        const user = new User();
        if (data.name) {user.name = data.name}
        if (data.password) {user.password = data.password}
        if (data.isActive) {user.isActive = data.isActive}
        await user.save();
        return UserMapper.toDTO(user);
    }

    public async update(id:number, data: IUserInputDTO): Promise<IUserDTO> {
        const user = await User.findOne(id);
        if (data.name) {user.name = data.name}
        if (data.password) {user.password = data.password}
        if (data.isActive) {user.isActive = data.isActive}
        await user.save();
        return UserMapper.toDTO(user);
    }

    public async delete(id: number): Promise<number> {
        const user = await User.findOne(id);
        user.remove()
        return 1;
    }
}