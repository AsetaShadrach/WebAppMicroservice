import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
    UpdateDateColumn,} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: "varchar", name: "first_name"})
    firstName: string;

    @Column({type: "varchar", name: "last_name"})
    lastName: string;

    @Column({type: "varchar", name: "email"})
    email: string;

    @Column({type: "varchar", name: "password_hash"})
    passwordHash: string;

    @Column({type: "varchar", name: "phone_number"})
    phoneNumber: string;

    @Column({type: "varchar", name: "user_is_verified", default: false})
    userIsVerified: boolean

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable()
    roles: Role[];

    @Column({type: "varchar", name: "registration_otp", nullable: true})
    registrationOtp: JSON;

    @Column({type: "jsonb", name: "company_membership_json", nullable: true})
    companyMembershipJson: JSON;

    @Column({type: "jsonb", name: "pending_update_json", nullable: true})
    pendingUpdateJson: JSON;

    @CreateDateColumn({name: "created_at"})
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at"})
    updatedAt: Date;
}
