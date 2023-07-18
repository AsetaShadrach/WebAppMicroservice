import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity({name: "transactions"})
export class Transactions {
    static table_alias = "t";

    @PrimaryColumn({ type: "varchar", name: "id" })
    id: string

    @Column({ type: "float", name: "amount" })
    amount: number

    @Column({type: "varchar", name: "transaction_type"})
    transactionType: string;

    @Column( {type: "varchar",  name: "status"})
    // Initiated,  pending, successful, manually completed, failed
    status: string;

    @Column({type: "varchar", name: "transfer_description", nullable: true})
    // String with the success or error messgage/reason/stage(e.g awaiting stk)
    transactionDescription: string;

    @Column({type: "varchar", name: "user_id"})
    userId: string;

    @Column({ type: "varchar", name: "provider" })
    // Safaricom(mpesa), safaricom, loan
    provider: string

    @Column({type: "varchar", name: "tracking_code" })
    trackingCode: string;

    @Column({type: "varchar", name: "bulk_tracking_code", nullable: true})
    // Relation Id for bulk transactions
    bulkTrackingCode: string;

    @Column( {type: "varchar", name: "user_transfer_description", nullable: true})
    userTransferDescription: string;

    @Column( {type: "varchar", name: "account_from"})
    account_from: string;

    @Column({type: "varchar", name: "account_to"})
    account_to: string;

    @Column({type: "json", name: "transfer_metadata", nullable: true})
    transferMetadata: JSON

    @Column({type: "varchar", name: "transfer_origin_id", nullable: true})
    transactionOriginId: string; // only filled when the transfer is of type reversal

    @Column({ type: "varchar", name: "response_body", nullable: true })
    responseBody: string

    @Column({ type: "json", name: "transaction_metadata", nullable: true })
    transactionMetadata: JSON

    @Column({ type: "timestamptz", name: "created_at" })
    createdAt: Date

    @Column({ type: "timestamptz", name: "updated_at" })
    updatedAt: Date
}
