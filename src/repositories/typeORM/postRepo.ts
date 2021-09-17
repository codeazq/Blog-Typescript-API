import IPostRepositoryInterface from '../interfaces/postInterface'
import { injectable } from "inversify"
import { Post } from "../../entity/Post"
import { IPostDTO, ICreatePostDTO, IUpdatePostDTO } from "../../dtos/postDTO"
import PostMapper from "../../mappers/PostMapper"
 

@injectable()
export default class PostRepository implements IPostRepositoryInterface {
	public async all(): Promise<IPostDTO[]> {
		const posts = await Post.find();
		posts.forEach(post => {
				return PostMapper.toDTO(post);
		});
		return posts;
	}

	public async find(id: number): Promise<IPostDTO> {
		const post = await Post.findOne(id);
		return PostMapper.toDTO(post);
	}

	public async create(data: ICreatePostDTO): Promise<IPostDTO> {
		const post = new Post();
		post.title = data.title;
		post.body = data.body;
		post.user_id = data.user_id;
		await post.save();
		return PostMapper.toDTO(post);
	}

	public async update(id:number, data: IUpdatePostDTO): Promise<IPostDTO> {
		const post = await Post.findOne(id);
		if (typeof data.title !== 'undefined' || data.title !== null) { post.title = data.title }
		if (typeof data.body !== 'undefined' || data.body !== null) { post.body = data.body }
		await post.save();
		return PostMapper.toDTO(post);
	}

	public async delete(id: number): Promise<any> {
		const post = await Post.findOne(id);
		post.remove()
		return 1;
	}
}