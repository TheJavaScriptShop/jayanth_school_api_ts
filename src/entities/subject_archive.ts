import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToOne } from "typeorm";
import { Student_Archive } from '../entities/student_archive'
import { Teacher_Archive } from '../entities/teacher_archive'
import { Timestamps } from '../entities/timetamp'
import { AcademicYear } from "./academicYear"

@Entity('Subject_Archive')
export class Subject_Archive extends Timestamps {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => Student_Archive, (student_archive) => student_archive)
    @JoinTable({ name: 'Student_Subject_Archive' })
    student: Student_Archive[]

    @ManyToOne(() => Teacher_Archive, (teacher_archive) => teacher_archive.subject, { onUpdate: 'CASCADE', onDelete: 'SET NULL', nullable: true })
    teacher: Teacher_Archive

    @ManyToOne(()=> AcademicYear, (academicYear)=>academicYear)
    academicYear: AcademicYear
    
}