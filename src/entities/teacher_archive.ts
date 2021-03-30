import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Subject_Archive } from '../entities/subject_archive'
import { Timestamps } from '../entities/timetamp'
import { AcademicYear } from "./academicYear"
import { Examinations_Archive } from "./examination_archive";

@Entity('Teacher_Archive')
export class Teacher_Archive extends Timestamps {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    gender: string

    @OneToMany(() => Subject_Archive, (subject_archive) => subject_archive.teacher, { onUpdate: 'CASCADE', cascade: true })
    subject: Subject_Archive[]

    @OneToMany(() => Examinations_Archive, (examinations_archive) => examinations_archive.teacher, { onUpdate: 'CASCADE', cascade: true })
    examinations: Examinations_Archive[]

    @ManyToOne(()=> AcademicYear, (academicYear)=>academicYear)
    academicYear: AcademicYear

}