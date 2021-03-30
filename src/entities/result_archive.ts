import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Student_Archive } from '../entities/student_archive'
import { Examinations_Archive } from '../entities/examination_archive'
import { Timestamps } from '../entities/timetamp'
import { AcademicYear } from "./academicYear"

@Entity('Result_Archive')
export class Result_Archive extends Timestamps {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    marks: number

    @ManyToOne(() => Student_Archive, (student_archive) => student_archive.marks, { 'cascade': true, onDelete: 'SET NULL' })
    student: Student_Archive

    @ManyToOne(() => Examinations_Archive, { 'cascade': true, onDelete: 'SET NULL' })
    @JoinColumn()
    exam: Examinations_Archive

    @ManyToOne(()=> AcademicYear, (academicYear)=>academicYear)
    academicYear: AcademicYear

}