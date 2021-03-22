import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SchoolClass } from "./school_class";


@Entity('section')
export class Section {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => SchoolClass, (schoolClass) => schoolClass.id, { onUpdate: "CASCADE", onDelete: "SET NULL", nullable: true })
    schoolClass: SchoolClass

}
