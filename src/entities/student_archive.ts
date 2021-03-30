import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, OneToOne, JoinColumn, ManyToOne } from 'typeorm'
import { IsEnum } from 'class-validator'
import { Subject_Archive } from './subject_archive'
import { Section_Archive } from './section_archive'
import { Result_Archive } from '../entities/result_archive'
import { Timestamps } from '../entities/timetamp';
import { AcademicYear } from "./academicYear"

export enum Gender {
    'male',
    'famale',
    'others'
}

@Entity('Student_Archive')
export class Student_Archive extends Timestamps {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false, unique: true })
    enrollmentId: string

    @Column()
    name: string

    @ManyToMany(() => Subject_Archive, (subject_archive) => subject_archive)
    @JoinTable({ name: 'Student_Subject_Archive' })
    subject: Subject_Archive[]

    @IsEnum(Gender)
    @Column()
    gender: string

    @OneToMany(() => Result_Archive, (result_archive) => result_archive.marks, { onUpdate: 'CASCADE' })
    marks: Result_Archive

    @ManyToOne(() => Section_Archive, { onDelete: "SET NULL", onUpdate: "CASCADE", nullable: true })
    @JoinColumn()
    section: Section_Archive

    @ManyToOne(()=> AcademicYear, (academicYear)=>academicYear)
    academicYear: AcademicYear

}
