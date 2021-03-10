import {SubjectService} from '../services/subject'
import {Context} from 'koa';

export default class SubjectControllers{
    public static async createNewSubject(ctx:Context){
        const subjectservice = new SubjectService()
        try {
            const {name , student,teacher} = ctx.request.body
            const subject = await subjectservice.create({name , student},teacher);
            ctx.body = subject;
        } catch (error) {
            console.log(error)
        }
    }

    public static async getSubjects(ctx:Context){
        const subjectservice = new SubjectService()
        try {
            const subjects = await subjectservice.getSubjects()
            ctx.body = subjects
        } catch (error) {
            console.log(error)
        }
    }

    public static async getSingleSubject(ctx:Context){
        const subjectservice = new SubjectService()
        try {
            const subject = await subjectservice.getSubjectById(ctx.request.body.id);
            ctx.body = subject
        } catch (error) {
            console.log(error)
        }
    }

    public static async updateSubject(ctx:Context){
        const subjectservice = new SubjectService()
        try {
            const {id , name ,student,teacher} = ctx.request.body
            const updatedSubject = await subjectservice.updateSubject({id,name,student,teacher})
            ctx.body= updatedSubject
        } catch (error) {
            console.log(error)
        }
    }

    public static async deleteSubject(ctx:Context){
        const subjectservice = new SubjectService()
        try {
            const {subjectId } = ctx.request.body;
            const deletedStudent = await subjectservice.deleteSubject(subjectId)
            ctx.body = "deleted Successfully"
        } catch (error) {
            console.log(error)
        }
    }
}