import {getManager, Repository } from 'typeorm'
import {Student} from '../entities/student'

export enum Gender{
    'male',
    'famale',
    'others'
}

export class StudentService {
    
    studentRepository: Repository<Student>;
    
    constructor(){
        this.studentRepository = getManager().getRepository(Student)
    }
    
    public async createStudent(s: Partial<Student>): Promise<Student>{
        
        const student = this.studentRepository.create({
            name: s.name,
            subject: s.subject,
            gender: s.gender
        })
    
        return this.studentRepository.save(student); 
    }

    public async updateStudent(s: Partial<Student>){
       
        const student = await this.studentRepository.findOne({
            where: {
                id: s.id
            }
        })
       
        student.id = s.id
        student.name = s.name;
        student.subject = s.subject;
        student.gender = s.gender;
       
        return this.studentRepository.save(student)
    }

    public async deleteStudent(s: Partial<Student>){
        
        const student = await this.studentRepository.findOne({
            where: {
                id: s.id
            }
        })
        
        if(!student){
            throw new Error("There are no Student with this ID");
        }else{
            this.studentRepository.delete(student);   
        }
    }

    public async getAllStudents(){
        
        const students = await this.studentRepository.find({ relations: ["subject"] });
        
        console.log(students);
        
        return students;
    }

    public async getStudentById(s: Partial<Student>){
        
        const student = await this.studentRepository.findOne({
            where: {
                id: s.id
            },
            relations: ["subject"]
        })
        
        return student;
    }
}