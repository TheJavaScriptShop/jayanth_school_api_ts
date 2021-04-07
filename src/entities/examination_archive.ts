import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TeacherArchive } from '../entities/teacher_archive'
import { Timestamps } from '../entities/timetamp'
import { AcademicYear } from "./academicYear";

@Entity('Examinations_Archive')
export class ExaminationsArchive extends Timestamps {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    examName: string

    @Column()
    subjectName: string

    @Column()
    totalMarks: number

    @Column({ nullable: true })
    maxTime: number

    @ManyToOne(() => TeacherArchive, (teacherArchive) => teacherArchive.examinations, { onDelete: "SET NULL", onUpdate: "CASCADE", nullable: true })
    teacher: TeacherArchive

    @ManyToOne(() => AcademicYear, (academicYear) => academicYear)
    academicYear: AcademicYear

}