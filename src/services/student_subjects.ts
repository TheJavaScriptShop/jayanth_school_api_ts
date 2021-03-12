import {getManager , Repository} from 'typeorm'
import {Student} from '../entities/student'
import {Subject} from '../entities/subject'

export class StudentSubjectService{
    studentrepository: Repository<Student>
    subjectrepository: Repository<Subject>
    constructor(){
        this.studentrepository = getManager().getRepository(Student);
        this.subjectrepository = getManager().getRepository(Subject);
    }

    public async assignSubject(studentId: number,subjectId: number){
        const student = await this.studentrepository.findOne({
            where:{
                id:studentId
            },
            relations: ["subject"]
        })
        const subject = await this.subjectrepository.findOne({
            where:{
                id:subjectId
            }
        })
        student.subject = [subject , ...student.subject]
        return this.studentrepository.save(student);
    }

} 
