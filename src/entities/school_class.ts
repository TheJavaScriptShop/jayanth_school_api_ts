import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Section } from "../entities/section";
import { Timestamps } from '../entities/timetamp'

@Entity('School_Class')
export class SchoolClass extends Timestamps {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    className: number

    @OneToMany(() => Section, (section) => section.schoolClass, { onUpdate: "CASCADE", onDelete: "SET NULL" })
    section: Section[]

}