import { Context } from 'koa';
import {StudentSubjectService} from '../services/student_subjects'

export default class StudentSubjectController{
    public static async assignSubject(ctx:Context){
        const student_subject_service = new StudentSubjectService()
        try {
            const { studentId } = ctx.request.body;
            const { subjectId } = ctx.request.body;

            ctx.checkBody('studentId').notEmpty('student id cannot be empty').isInt('student Id should be int or number ')
            ctx.checkBody('subjectId').notEmpty('subject id cannot be empty').isInt('subject Id should be int or number ')

            if(ctx.errors){
                ctx.body = ctx.errors;
                ctx.response.status = 400;
            }else{
                student_subject_service.assignSubject(studentId, subjectId)
                ctx.body = { message:"successfuly assigned " }
            }

        } catch (error) {
            ctx.body = {message:error.message}
        }
    }
}