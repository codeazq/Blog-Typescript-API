import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import { Post } from "./Post";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column()
    isActive: boolean;

    @OneToMany(() => Post, post => post.user)
    posts: Post[];

    @CreateDateColumn()
    created_at: any;

    @UpdateDateColumn()
    updated_at: any;
}
