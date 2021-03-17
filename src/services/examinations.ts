import { Repository , getManager } from 'typeorm'
import {Examinations} from '../entities/examinations'
import {Teacher} from '../entities/teacher'
import {Subject} from '../entities/subject'

export class ExamService{
    examrespository:Repository<Examinations>
    teacherrepository:Repository<Teacher>
    subjectrepository:Repository<Subject>
    constructor(){
        this.examrespository = getManager().getRepository(Examinations)
        this.teacherrepository = getManager().getRepository(Teacher)
        this.subjectrepository = getManager().getRepository(Subject)
    }

    public async createExam(examinations:Partial<Examinations>, teacherId,subjectId){
        const assignTeacher = await this.teacherrepository.findOne({
            where:{
                id:teacherId
            }
        })
        if(!assignTeacher){
            throw new Error("Teacher not found");
            
        }
        const subject = await this.subjectrepository.findOne({
            where:{
                id: subjectId
            }
        })
        if(!subject){
            throw new Error("Subject not found");
            
        }
        const exam = await this.examrespository.create({
            id: examinations.id,
            exam_name:examinations.exam_name,
            subject_name:subject.name,
            total_marks:examinations.total_marks,
            max_time:examinations.max_time,
            teacher:assignTeacher
        })
        return this.examrespository.save(exam);
    }
}