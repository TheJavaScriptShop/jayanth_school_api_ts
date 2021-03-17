import { Context } from 'koa';
import {ExamService} from '../services/examinations'

export default class ExamControllers{

    public static async createExam(ctx:Context){
        const examService =  new ExamService()
        try {
            const {id , exam_name , subjectId , total_marks , max_time , teacherId} = ctx.request.body
            ctx.checkBody('id').optional().isInt('id should be a number');
            ctx.checkBody('exam_name').notEmpty('exam name cannot be empty');
            ctx.checkBody('subjectId').notEmpty('subject Id cannot be empty').isInt('subject Id should be number')
            ctx.checkBody('total_marks').notEmpty('total marks cannot be empty').isInt('total marks should be a number')
            ctx.checkBody('max_time').notEmpty('max_time cannot be empty').isInt('max_time should only contain numbers and alphabets')
            ctx.checkBody('teacherId').notEmpty('teacher id cannot be empty').isInt('teacher id should be number')
            if(ctx.errors){
                ctx.body = ctx.errors;
                ctx.response.status = 400;
            }
            else{
                const exam = await examService.createExam({exam_name,total_marks,max_time},teacherId , subjectId)
                ctx.body = exam
            }
        } catch (error) {
            ctx.body = {message:error.message}
        }
    }
}