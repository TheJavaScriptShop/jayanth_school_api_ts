import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable, ManyToOne} from "typeorm";
import {Student} from '../entities/student'
import {Teacher} from '../entities/teacher'
@Entity('Subject')
export class Subject{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @ManyToMany(()=> Student , (student)=>student)
    @JoinTable({name: 'student_subject'})
    student:Student[]

    @ManyToOne(()=>Teacher , (teacher)=>teacher,{onUpdate:'CASCADE',onDelete:'CASCADE'})
    teacher:Teacher
}