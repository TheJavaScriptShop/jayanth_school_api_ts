import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Teacher } from '../entities/teacher'
import { Timestamps } from '../entities/timetamp'

@Entity('Examinations')
export class Examinations extends Timestamps {

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

    @ManyToOne(() => Teacher, (teacher) => teacher.examinations, { onDelete: "SET NULL", onUpdate: "CASCADE", nullable: true })
    teacher: Teacher

}