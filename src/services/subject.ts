import {getManager , Repository} from 'typeorm'
import { Subject } from '../entities/subject'


export class SubjectService{
    subjectrepository:Repository<Subject>
    constructor(){
        this.subjectrepository = getManager().getRepository(Subject);
    }
    public async create(s:Partial<Subject>){
        const subject = await this.subjectrepository.create({
            name:s.name,
            student:s.student
        })
        return this.subjectrepository.save(subject);
    }

    public async getSubjects(){
        const subjects = await this.subjectrepository.find({ relations : ["student"]});
        return subjects
    }

    public async getSubjectById(subjectId:number){
        const subject = await this.subjectrepository.findOne({
            where:{
                id:subjectId
            },relations:['student']
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