import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from '../entities/timetamp'

@Entity('AcademicYear')
export class AcademicYear extends Timestamps {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    label: string

}