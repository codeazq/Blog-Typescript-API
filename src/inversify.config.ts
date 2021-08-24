import { Container } from "inversify";
import { TYPES } from "./types";
import { IPostInterface } from "./repositories/interfaces/postInterface";
import PostRepository from "./repositories/typeORM/postRepo";

const myContainer = new Container();
myContainer.bind<IPostInterface>(TYPES.IPostInterface).to(PostRepository);

export { myContainer };