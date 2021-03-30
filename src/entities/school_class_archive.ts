import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Section_Archive } from "../entities/section_archive";
import { Timestamps } from '../entities/timetamp'
import { AcademicYear } from "./academicYear"

@Entity('School_Class_Archive')
export class SchoolClass_Archive extends Timestamps {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    className: number

    @OneToMany(() => Section_Archive, (section_archive) => section_archive.schoolClass, { onUpdate: "CASCADE", onDelete: "SET NULL" })
    section: Section_Archive[]

    @ManyToOne(()=> AcademicYear, (academicYear)=>academicYear)
    academicYear: AcademicYear
    
}