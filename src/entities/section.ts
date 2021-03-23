import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SchoolClass } from "./school_class";
import { Student } from '../entities/student'


@Entity('section')
export class Section {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => SchoolClass, (schoolClass) => schoolClass.id, { onUpdate: "CASCADE", onDelete: "SET NULL", nullable: true })
    schoolClass: SchoolClass

    // @OneToOne(()=> Student)
    // @JoinColumn()
    // student: Student

}
