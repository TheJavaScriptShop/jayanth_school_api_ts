import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Teacher_Archive } from '../entities/teacher_archive'
import { Timestamps } from '../entities/timetamp'
import { AcademicYear } from "./academicYear";

@Entity('Examinations_Archive')
export class Examinations_Archive extends Timestamps {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    exam_name: string

    @Column()
    subject_name: string

    @Column()
    total_marks: number

    @Column({ nullable: true })
    max_time: number

    @ManyToOne(() => Teacher_Archive, (teacher_archive) => teacher_archive.examinations, { onDelete: "SET NULL", onUpdate: "CASCADE", nullable: true })
    teacher: Teacher_Archive

    @ManyToOne(()=> AcademicYear, (academicYear)=>academicYear)
    academicYear: AcademicYear

}