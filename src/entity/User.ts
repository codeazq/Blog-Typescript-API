import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, BeforeInsert} from "typeorm";
import { Post } from "./Post";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    password: string;

    @Column({
        unique: true
    })
    userName: string;

    @Column('boolean', {default: true})
    isActive: boolean = true;

    @OneToMany(() => Post, post => post.user)
    posts: Post[];

    @CreateDateColumn()
    created_at: any;

    @UpdateDateColumn()
    updated_at: any;
}
