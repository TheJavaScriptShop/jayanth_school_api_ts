import { Column, Entity } from "typeorm";

export abstract class Timestamps {

    @Column({ type: 'timestamp with time zone', default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: 'timestamp with time zone', default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}
