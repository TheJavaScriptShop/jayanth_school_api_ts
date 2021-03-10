import { Context } from 'koa';
import { student_subject_router } from 'src/routes/student_subject';
import {StudentSubjectService} from '../services/student_subjects'

export default class StudentSubjectController{
    public static async assignSubject(ctx:Context){
        console.log("in assignment controller");
        const student_subject_service = new StudentSubjectService()
        try {
            const { student_id } = ctx.request.body;
            const { subject_id } = ctx.request.body;
            //const assigned_student = await student_subject_service.assign_subject(student_id , subject_id);
            student_subject_service.assignSubject(student_id, subject_id)
            ctx.body = "successfully assigned"

        } catch (error) {
            console.log(error)
        }
    }
}