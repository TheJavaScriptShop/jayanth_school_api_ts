import { getManager, Repository } from 'typeorm'
import {Student} from '../entities/student'

export enum Gender{
    'male',
    'famale',
    'others'
}

export class StudentService {
    studentRepository:Repository<Student>;
    constructor(){
        this.studentRepository = getManager().getRepository(Student)
    }
    public async createStudent(s: Partial<Student>): Promise<Student>{
        const student = this.studentRepository.create({
            name:s.name,
            subject:s.subject,
            gender:s.gender
        })
        return this.studentRepository.save(student)
    }

    public async updateStudent(s:Partial<Student>){
        console.log(s);
        const student = await this.studentRepository.findOne({
            where:{
                id:s.id
            }
        })
        console.log(student);
        student.name = s.name;
        student.subject = s.subject;
        student.gender = s.gender;
        //this.studentRepository.update({where:{id:s.id}},{name:s.name,subject:s.subject,gender:s.gender})
        return this.studentRepository.save(student)
    }
}