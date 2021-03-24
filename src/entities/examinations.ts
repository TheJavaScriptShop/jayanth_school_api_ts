import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Teacher } from '../entities/teacher'

@Entity('examinations')
export class Examinations {

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

    @ManyToOne(() => Teacher, (teacher) => teacher.examinations, { onDelete: "SET NULL", onUpdate: "CASCADE", nullable: true })
    teacher: Teacher

}