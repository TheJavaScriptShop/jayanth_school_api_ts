import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToOne } from "typeorm";
import { StudentArchive } from '../entities/student_archive'
import { TeacherArchive } from '../entities/teacher_archive'
import { Timestamps } from '../entities/timetamp'
import { AcademicYear } from "./academicYear"

@Entity('Subject_Archive')
export class SubjectArchive extends Timestamps {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => StudentArchive, (studentArchive) => studentArchive)
    @JoinTable({ name: 'Student_Subject_Archive' })
    student: StudentArchive[]

    @ManyToOne(() => TeacherArchive, (teacherArchive) => teacherArchive.subject, { onUpdate: 'CASCADE', onDelete: 'SET NULL', nullable: true })
    teacher: TeacherArchive

    @ManyToOne(() => AcademicYear, (academicYear) => academicYear)
    academicYear: AcademicYear

}