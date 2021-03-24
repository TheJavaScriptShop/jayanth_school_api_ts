import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SchoolClass } from "./school_class";
import { Student } from "../entities/student"


@Entity('section')
export class Section {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => SchoolClass, (schoolClass) => schoolClass.id, { onUpdate: "CASCADE", onDelete: "SET NULL", nullable: true })
    schoolClass: SchoolClass

    @OneToMany(() => Student, (student) => student.section, { onUpdate: "CASCADE", cascade: true })
    student: Student[]
}
