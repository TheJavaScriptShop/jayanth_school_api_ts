import { getManager, Repository } from 'typeorm'
import { Student } from '../entities/student'
import { Subject } from '../entities/subject'
import { Section } from '../entities/section'

export enum Gender {
    'male',
    'famale',
    'others'
}

export class StudentService {

    studentRepository: Repository<Student>;
    subjectRepository: Repository<Subject>;
    sectionRepository: Repository<Section>;

    constructor() {
        this.studentRepository = getManager().getRepository(Student)
        this.subjectRepository = getManager().getRepository(Subject)
        this.sectionRepository = getManager().getRepository(Section)
    }

    public async createStudent(student: Partial<Student>, sectionId: number){

        const section = await this.sectionRepository.findOne({
            where: {
                id: sectionId
            }
        })
        if(!section){
            throw new Error("No section Found");
        }else{
            const newStudent = await this.studentRepository.create({
                name: student.name,
                gender: student.gender,
                section: section
            })

            return this.studentRepository.save(newStudent);   
        }
    }

    public async updateStudent(s: Partial<Student>) {

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

    public async deleteStudent(sId: number) {

        const student = await this.studentRepository.findOne({
            where: {
                id: sId
            }
        })

        if (!student) {
            throw new Error("There are no Student with this ID");
        } else {
            this.studentRepository.delete(student.id)
        }
    }

    public async getAllStudents() {

        const students = await this.studentRepository.find({ relations: ["subject","section"] });

        return students;
    }

    public async getStudentById(s: Partial<Student>) {

        const student = await this.studentRepository.findOne({
            where: {
                id: s.id
            },
            relations: ["subject"]
        })

        return student;
    }
}