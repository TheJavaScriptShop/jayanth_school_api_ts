import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable, ManyToOne } from "typeorm";
import { Student } from '../entities/student'
import { Teacher } from '../entities/teacher'
import { Timestamps } from '../entities/timetamp'

@Entity('Subject')
export class Subject extends Timestamps {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => Student, (student) => student)
    @JoinTable({ name: 'Student_Subject' })
    student: Student[]

    @ManyToOne(() => Teacher, (teacher) => teacher.subject, { onUpdate: 'CASCADE', onDelete: 'SET NULL', nullable: true })
    teacher: Teacher
}