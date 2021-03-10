import {getManager , Repository} from 'typeorm'
import { Subject } from '../entities/subject'
import {Teacher} from '../entities/teacher'


export class SubjectService{
    subjectrepository:Repository<Subject>
    teacherrepository:Repository<Teacher>
    constructor(){
        this.subjectrepository = getManager().getRepository(Subject);
        this.teacherrepository = getManager().getRepository(Teacher)
    }
    public async create(s:Partial<Subject>, teacherId:number){
        const assignteacher = await this.teacherrepository.findOne({
            where:{
                id:teacherId
            }
        })
        const subject = await this.subjectrepository.create({
            name:s.name,
            student:s.student,
            teacher:assignteacher
        })
        return this.subjectrepository.save(subject);
    }

    public async getSubjects(){
        const subjects = await this.subjectrepository.find({ relations : ["student",'teacher']});
        return subjects
    }

    public async getSubjectById(subjectId:number){
        const subject = await this.subjectrepository.findOne({
            where:{
                id:subjectId
            },relations:['student','teacher']
        })
        return subject
    }

    public async updateSubject(s:Partial<Subject>){
        const subject = await this.subjectrepository.findOne({
            where:{
                id:s.id
            }
        })
        subject.id = s.id;
        subject.name = s.name;
        subject.student = s.student;
        return this.subjectrepository.save(subject);
    }

    public async deleteSubject(subjectId:number){
        const subject = await this.subjectrepository.findOne({
            where:{
                id:subjectId
            }
        })
        this.subjectrepository.delete(subject)
    }
}