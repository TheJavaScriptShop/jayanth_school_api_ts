import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Subject} from '../entities/subject'
@Entity('Teacher')
export class Teacher{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    gender:string

    @OneToMany(()=> Subject, (subject)=>subject, {onDelete:'CASCADE' ,onUpdate:'CASCADE'})
    subject:Subject
}