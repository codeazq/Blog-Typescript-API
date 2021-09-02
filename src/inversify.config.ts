import { Container } from "inversify";
import { TYPES } from "./types";
import IPostRepositoryInterface from "./repositories/interfaces/postInterface";
import PostRepository from "./repositories/typeORM/postRepo";
import IUserRepositoryInterface from "./repositories/interfaces/userInterface";
import UserRepository from "./repositories/typeORM/userRepo";

const myContainer = new Container();
myContainer.bind<IPostRepositoryInterface>(TYPES.IPostRepositoryInterface).to(PostRepository);
myContainer.bind<IUserRepositoryInterface>(TYPES.IUserRepositoryInterface).to(UserRepository);

export { myContainer };