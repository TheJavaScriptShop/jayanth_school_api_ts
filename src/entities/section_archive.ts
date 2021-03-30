import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SchoolClass_Archive } from "./school_class_archive";
import { Student_Archive } from "../entities/student_archive"
import { Timestamps } from '../entities/timetamp'
import { AcademicYear } from "./academicYear"

@Entity('Section_Archive')
export class Section_Archive extends Timestamps {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => SchoolClass_Archive, (schoolClass_archive) => schoolClass_archive.id, { onUpdate: "CASCADE", onDelete: "SET NULL", nullable: true })
    schoolClass: SchoolClass_Archive

    @OneToMany(() => Student_Archive, (student_archive) => student_archive.section, { onUpdate: "CASCADE", cascade: true })
    student: Student_Archive[]

    @ManyToOne(()=> AcademicYear, (academicYear)=>academicYear)
    academicYear: AcademicYear
    
}
