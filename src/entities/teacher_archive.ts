import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubjectArchive } from '../entities/subject_archive'
import { Timestamps } from '../entities/timetamp'
import { AcademicYear } from "./academicYear"
import { ExaminationsArchive } from "./examination_archive";

@Entity('Teacher_Archive')
export class TeacherArchive extends Timestamps {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    gender: string

    @OneToMany(() => SubjectArchive, (subjectArchive) => subjectArchive.teacher, { onUpdate: 'CASCADE', cascade: true })
    subject: SubjectArchive[]

    @OneToMany(() => ExaminationsArchive, (examinationsArchive) => examinationsArchive.teacher, { onUpdate: 'CASCADE', cascade: true })
    examinations: ExaminationsArchive[]

    @ManyToOne(() => AcademicYear, (academicYear) => academicYear)
    academicYear: AcademicYear

}