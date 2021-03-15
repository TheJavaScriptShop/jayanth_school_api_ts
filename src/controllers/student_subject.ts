import { Context } from 'koa';
import { student_subject_router } from 'src/routes/student_subject';
import {StudentSubjectService} from '../services/student_subjects'

export default class StudentSubjectController{
    public static async assignSubject(ctx:Context){
        const student_subject_service = new StudentSubjectService()
        try {
            const { studentId } = ctx.request.body;
            const { subjectId } = ctx.request.body;
            ctx.checkBody('studentId').notEmpty('student id cannot be empty').isInt('student Id should be int or number ')
            ctx.checkBody('subjectId').notEmpty('subject id cannot be empty').isInt('subject Id should be int or number ')
            //const assigned_student = await student_subject_service.assign_subject(student_id , subject_id);
            student_subject_service.assignSubject(studentId, subjectId)
            ctx.body = "successfully assigned"

        } catch (error) {
            console.log(error)
        }
    }
}