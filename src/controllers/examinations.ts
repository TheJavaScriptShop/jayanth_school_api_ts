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

    public static async updateExam(ctx:Context){
        
        const examService = new ExamService();
        
        try {
            const {id , exam_name , subjectId , total_marks , max_time , teacherId} = ctx.request.body;

            ctx.checkBody('id').optional().isInt('id should be a number');
            ctx.checkBody('exam_name').optional().notEmpty('exam name cannot be empty');
            ctx.checkBody('subjectId').optional().notEmpty('subject Id cannot be empty').isInt('subject Id should be number')
            ctx.checkBody('total_marks').optional().notEmpty('total marks cannot be empty').isInt('total marks should be a number')
            ctx.checkBody('max_time').optional().notEmpty('max_time cannot be empty').isInt('max_time should only contain numbers and alphabets')
            ctx.checkBody('teacherId').optional().notEmpty('teacher id cannot be empty').isInt('teacher id should be number')
            
            if(ctx.errors){
                ctx.body = ctx.errors;
                ctx.response.status = 400;
            }
            else{
                const updatedExam = await  examService.updateExam({id,exam_name,total_marks,max_time},teacherId , subjectId)
                ctx.body = { message:"Updated Successfully" , updatedExam }
            }

        } catch (error) {
            ctx.body = { message: error.message }
        }
    }

    public static async getSingleExam(ctx:Context){

        const examService = new ExamService();
        
        try {
            const  {examId}  = ctx.request.body;
            
            ctx.checkBody('examId').notEmpty('This cannot be empty').isInt('This should be a number')

            const exam = await examService.getOneExam(examId)
            ctx.body = exam

        } catch (error) {
            ctx.body = { message:error.message }
        }
    }

    public static async getExams(ctx:Context){

        const examService = new ExamService();

        try {
            const exams = await examService.getAllExams();
            ctx.body = { message:"Success" , exams }

        } catch (error) {
            ctx.body = { message:error.message }
        }
    }

    public static async deleteExam(ctx:Context){

        const examService = new ExamService();
        const { examId } = ctx.request.body

        ctx.checkBody('examId').notEmpty('It cannot be empty').isInt('It should be number')
        
        try {
            const exam = await examService.deleteExam(examId)
            ctx.body = { message:"deleted successfully" }

        } catch (error) {
            ctx.body = { message:error.message }
        }
    }
}