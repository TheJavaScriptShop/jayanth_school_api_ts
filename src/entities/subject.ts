import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, JoinTable } from "typeorm";
import {Student} from '../entities/student'

@Entity('Subject')
export class Subject{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @ManyToMany(()=> Student , (student)=>student)
    @JoinTable({name: 'student_subject'})
    student:Student[]

}