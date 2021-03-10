import {Entity,Column,PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm'
import {IsEnum} from 'class-validator'
import { Subject } from './subject'

export enum Gender{
    'male',
    'famale',
    'others'
}

@Entity('Student')
export class Student{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @ManyToMany(()=>Subject ,(subject)=>subject)
    @JoinTable({name: 'student_subject'})
    subject:Subject[]

    @IsEnum(Gender)
    @Column()
    gender:string
}