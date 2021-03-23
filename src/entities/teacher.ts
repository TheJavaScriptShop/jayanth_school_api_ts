import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Subject } from '../entities/subject'
import { Examinations } from '../entities/examinations'
@Entity('Teacher')
export class Teacher {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    gender: string

    @OneToMany(() => Subject, (subject) => subject.teacher, { onUpdate: 'CASCADE', cascade: true })
    subject: Subject[]

    @OneToMany(() => Examinations, (examinations) => examinations.teacher, { onUpdate: 'CASCADE', cascade: true })
    examinations: Examinations[]
}