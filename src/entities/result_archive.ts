import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StudentArchive } from '../entities/student_archive'
import { ExaminationsArchive } from '../entities/examination_archive'
import { Timestamps } from '../entities/timetamp'
import { AcademicYear } from "./academicYear"

@Entity('Result_Archive')
export class ResultArchive extends Timestamps {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    marks: number

    @ManyToOne(() => StudentArchive, (studentArchive) => studentArchive.marks, { 'cascade': true, onDelete: 'SET NULL' })
    student: StudentArchive

    @ManyToOne(() => ExaminationsArchive, { 'cascade': true, onDelete: 'SET NULL' })
    @JoinColumn()
    exam: ExaminationsArchive

    @ManyToOne(() => AcademicYear, (academicYear) => academicYear)
    academicYear: AcademicYear

}