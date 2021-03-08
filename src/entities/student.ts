import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm'
import {IsEnum} from 'class-validator'

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

    @Column()
    subject:string

    @IsEnum(Gender)
    @Column()
    gender:string
}