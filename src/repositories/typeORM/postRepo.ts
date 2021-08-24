import { IPostInterface } from '../interfaces/postInterface'
import { injectable, inject } from "inversify"
import { Post } from "../../entity/Post"
import { IPostDTO, IPostInputDTO } from "../../dtos/postDTO"
import PostMapper from "../../mappers/PostMapper"
 

@injectable()
class PostRepository implements IPostInterface {
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

    public async create(data: IPostInputDTO): Promise<IPostDTO> {
        const post = new Post();
        post.title = data.title;
        post.body = data.body;
        post.user_id = data.user_id;
        await post.save();
        return PostMapper.toDTO(post);
    }

    public async update(id:number, data: IPostInputDTO): Promise<IPostDTO> {
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

export default PostRepository