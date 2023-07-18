import {Entity, Column, PrimaryColumn} from "typeorm";
// todo: remove nullable for the new fields


@Entity({name: "payments"})
export class PaymentsTable {
    static table_alias = "t";

    @PrimaryColumn({ type: "varchar", name: "id" })
    id: string

    @Column( {type: "varchar",  name: "transaction_id"})
    // Initiated,  pending, successful, manually completed, failed
    transactionId: string;

    @Column( {type: "varchar",  name: "status"})
    // Initiated,  pending, successful, manually completed, failed
    status: string;

    @Column({type: "varchar", name: "payment_description", nullable: true})
    // More description on the payment status
    paymentDescription: string;

    @Column({ type: "float", name: "amount" })
    amount: number

    @Column({type: "varchar", name: "mpesa_tracking_code" })
    mpesaTrackingCode: string;

    @Column({type: "varchar", name: "conversation_id"})
    conversationId: string;

    @Column({type: "varchar", name: "originator_conversation_id", nullable: true})
    originatorConversationID: string;

    @Column({type: "json", name: "callback", nullable: true})
    callback: JSON

    @Column({ type: "varchar", name: "response_body", nullable: true })
    // Whether failed or successful add response body here
    responseBody: JSON

    @Column({ type: "json", name: "payment_metadata", nullable: true })
    paymentMetadata: JSON

    @Column({ type: "timestamptz", name: "created_at" })
    createdAt: Date

    @Column({ type: "timestamptz", name: "updated_at" })
    updatedAt: Date

    @Column( {type: "timestamptz", name: "callback_at", nullable: true})
    callbackAt: Date

    @Column({type: "varchar", name: "processed_by", nullable: true})
    processedBy: string;

    @Column( {type: "timestamptz", name: "processed_at", nullable: true})
    processedAt: Date
}
