import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, OneToOne, JoinColumn, ManyToOne } from 'typeorm'
import { IsEnum } from 'class-validator'
import { SubjectArchive } from './subject_archive'
import { SectionArchive } from './section_archive'
import { ResultArchive } from '../entities/result_archive'
import { Timestamps } from '../entities/timetamp';
import { AcademicYear } from "./academicYear"

export enum Gender {
    'male',
    'famale',
    'others'
}

@Entity('Student_Archive')
export class StudentArchive extends Timestamps {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false, unique: true })
    enrollmentId: string

    @Column()
    name: string

    @ManyToMany(() => SubjectArchive, (subjectArchive) => subjectArchive)
    @JoinTable({ name: 'Student_Subject_Archive' })
    subject: SubjectArchive[]

    @IsEnum(Gender)
    @Column()
    gender: string

    @OneToMany(() => ResultArchive, (resultArchive) => resultArchive.marks, { onUpdate: 'CASCADE' })
    marks: ResultArchive

    @ManyToOne(() => SectionArchive, { onDelete: "SET NULL", onUpdate: "CASCADE", nullable: true })
    @JoinColumn()
    section: SectionArchive

    @ManyToOne(()=> AcademicYear, (academicYear)=>academicYear)
    academicYear: AcademicYear

}
