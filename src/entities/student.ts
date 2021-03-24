import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, OneToOne, JoinColumn, ManyToOne } from 'typeorm'
import { IsEnum } from 'class-validator'
import { Subject } from './subject'
import { Section } from './section'
import { Result } from '../entities/result'
import { Timestamps } from '../entities/timetamp';

export enum Gender {
    'male',
    'famale',
    'others'
}

@Entity('Student')
export class Student extends Timestamps {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => Subject, (subject) => subject)
    @JoinTable({ name: 'student_subject' })
    subject: Subject[]

    @IsEnum(Gender)
    @Column()
    gender: string

    @OneToMany(() => Result, (result) => result.marks, { onUpdate: 'CASCADE' })
    marks: Result

    @ManyToOne(() => Section, { onDelete: "SET NULL", onUpdate: "CASCADE", nullable: true })
    @JoinColumn()
    section: Section
}
