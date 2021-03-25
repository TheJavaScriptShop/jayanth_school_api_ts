import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../entities/student'
import { Examinations } from '../entities/examinations'
import { Timestamps } from '../entities/timetamp'

@Entity('result')
export class Result extends Timestamps {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    marks: number

    @ManyToOne(() => Student, (student) => student.marks, { 'cascade': true, onDelete: 'SET NULL' })
    student: Student

    @ManyToOne(() => Examinations, { 'cascade': true, onDelete: 'SET NULL' })
    @JoinColumn()
    exam: Examinations
}