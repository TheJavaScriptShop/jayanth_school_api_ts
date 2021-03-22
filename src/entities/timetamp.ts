import { Column, Entity } from "typeorm";

export abstract class Timestamps {

    @Column({type: 'timestamp with time zone', default: () => "CURRENT_TIMESTAMP"})
    // @Column('timestamp with time zone')
    createdAt: Date;

    @Column({type: 'timestamp with time zone', default: () => "CURRENT_TIMESTAMP"})
    // @Column('timestamp with time zone')
    updatedAt: Date;
}
