import PostService from "../services/post"
import UserService from "../services/user"
import { myContainer } from "../inversify.config"
import { injectable } from "inversify"

@injectable()
export default class PostPolicy { 
    public postService: PostService

    public userService: UserService

    constructor() {
        this.postService = myContainer.resolve<PostService>(PostService);
        this.userService = myContainer.resolve<UserService>(UserService);
    }

    public async update(userId: number, postId: number): Promise<any> {
        const user = await this.userService.find(userId);
        const post = await this.postService.find(postId);
        const ownership: boolean = (user.id === post.user_id)
        console.log(`ownership: ${ownership}`)
        // console.log("good")
        return new Promise((resolve, reject) => {
            if (ownership) {
                resolve(ownership);
            } else {
                reject({message: "User does not own this post"});
            }
        })
    }

    public async delete(userId: number, postId: number): Promise<any> {
        const user = await this.userService.find(userId);
        const post = await this.postService.find(postId);
        const ownership: boolean = (user.id === post.user_id)
        return new Promise((resolve, reject) => {
            if (ownership) {
                resolve(ownership);
            } else {
                reject({message: "User does not own this post"});
            }
        })
    }
}