import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
    UpdateDateColumn,} from 'typeorm';
import { Role } from '../entities/role.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    phoneNumber: string;

    @Column({default: false})
    userIsVerified: boolean

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable()
    roles: Role[];

    @Column({type: "jsonb", name: "company_membership_json", nullable: true})
    companyMembershipJson: JSON;

    @Column({type: "jsonb", name: "pending_update_json", nullable: true})
    pendingUpdateJson: JSON;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
