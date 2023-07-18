import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,} from 'typeorm';


@Entity()
export class Company {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    companyName: string;

    @Column()
    primaryEmail: string;

    @Column({type: "jsonb", name: "members", nullable: true})
    members: JSON;

    @Column({type: "boolean", name: "require_signatories", default: false})
    requireSignatories: boolean;

    @Column({type: "jsonb", name: "signatories", nullable: true})
    signatories: JSON;

    @Column({type: "integer", name: "signatory_count", nullable: true})
    signatoryCount: number;// To check against the number of people that signed for that transaction

    // Hold the last 5 actions
    @Column({type: "jsonb", name: "recent_actions", nullable: true})
    recentActions: JSON;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}