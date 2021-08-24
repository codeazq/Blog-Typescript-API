import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { User } from "./User";

@Entity()
export class Post extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("text")
    body: string;

    @Column("int")
    user_id: number;

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({ name: "user_id" })
    user: User;

    @CreateDateColumn()
    created_at: any;

    @UpdateDateColumn()
    updated_at: any;
}