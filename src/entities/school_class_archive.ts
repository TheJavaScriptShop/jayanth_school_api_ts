import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SectionArchive } from "../entities/section_archive";
import { Timestamps } from '../entities/timetamp'
import { AcademicYear } from "./academicYear"

@Entity('School_Class_Archive')
export class SchoolClassArchive extends Timestamps {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    className: number

    @OneToMany(() => SectionArchive, (sectionArchive) => sectionArchive.schoolClass, { onUpdate: "CASCADE", onDelete: "SET NULL" })
    section: SectionArchive[]

    @ManyToOne(()=> AcademicYear, (academicYear)=>academicYear)
    academicYear: AcademicYear
    
}