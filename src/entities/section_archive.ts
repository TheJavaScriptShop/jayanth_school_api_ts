import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SchoolClassArchive } from "./school_class_archive";
import { StudentArchive } from "../entities/student_archive"
import { Timestamps } from '../entities/timetamp'
import { AcademicYear } from "./academicYear"

@Entity('Section_Archive')
export class SectionArchive extends Timestamps {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => SchoolClassArchive, (schoolClassArchive) => schoolClassArchive.id, { onUpdate: "CASCADE", onDelete: "SET NULL", nullable: true })
    schoolClass: SchoolClassArchive

    @OneToMany(() => StudentArchive, (studentArchive) => studentArchive.section, { onUpdate: "CASCADE", cascade: true })
    student: StudentArchive[]

    @ManyToOne(()=> AcademicYear, (academicYear)=>academicYear)
    academicYear: AcademicYear
    
}
