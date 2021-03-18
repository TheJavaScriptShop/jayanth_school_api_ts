import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Section } from "../entities/section";

@Entity('school_class')
export class SchoolClass{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    className: number

    @OneToMany(()=>Section, (section)=>section)
    section: Section[]

}