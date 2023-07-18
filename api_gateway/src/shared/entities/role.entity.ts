import { User } from '../entities/user.entity';
import {Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => User, (user) => user.roles)
    users: User[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}