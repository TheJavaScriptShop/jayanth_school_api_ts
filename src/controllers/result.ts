import {Context} from "koa"
import {ResultService} from '../services/result'

export default class ResultControllers{
    
    public static async addResult(ctx:Context){
        
        const resultService = new ResultService()
        
        try {
            const { marks, student, exam } = ctx.request.body
        
            ctx.checkBody('marks').notEmpty('marks cannot be empty')
            ctx.checkBody('student').notEmpty('student id cannot be empty').isInt('it should be number')
            ctx.checkBody('exam').notEmpty('it cannot be empty').isInt('it should be number')
        
            if(ctx.errors){
                ctx.body = ctx.errors
                ctx.response.status = 400
            }else{
                const result = await resultService.createResult(student,exam,marks)
                ctx.body = result
            }
        
        } catch (error) {
            ctx.body = error
        }
    }

    public static async updateResult(ctx:Context){

        const resultService = new ResultService();

        try {
            const { resId, examId, sId, marks } = ctx.request.body;

            ctx.checkBody('resId').optional().notEmpty('It cannot be empty').isInt('It should be a number')
            ctx.checkBody('examId').optional().notEmpty('It cannot be empty').isInt('It should be a number')
            ctx.checkBody('sId').optional().notEmpty('It cannot be empty').isInt('It should be a number')
            ctx.checkBody('marks').optional().notEmpty('It cannot be empty').isInt('It should be a number')

            if(ctx.errors){
                ctx.body = ctx.errors;
                ctx.response.status = 400;
            }else{
                const updatedStudent = await resultService.updateResult(resId, examId, sId, marks);
                ctx.body = { message:"updated Successfully", updatedStudent }
            }

        } catch (error) {
            ctx.body = { message: error.message }
        }
    }

    public static async getResult(ctx:Context){

        const resultService = new ResultService()

        try {
            const { resId } = ctx.request.body

            ctx.checkBody('resId').notEmpty('It cannot be empty').isInt('It should be a number')
            if(ctx.errors){
                ctx.body = ctx.errors;
                ctx.response.status = 400;
            }else{
                const result = await resultService.getOneResult(resId);
                ctx.body = result
            }

        } catch (error) {
            ctx.body = { message: error.message }
        }
    }

    public static async getResults(ctx:Context){

        const resultService = new ResultService()

        try {
            const results = await resultService.getResults()
            
            ctx.body = { message:"Success" , results }
        } catch (error) {
            ctx.body= { message:error.message }
        }
    }

    public static async deleteResult(ctx:Context){

        const resultService = new ResultService()

        try {
            const { resId } = ctx.request.body;
            ctx.checkBody('resId').notEmpty('This cannot be empty').isInt('It should be a number')

            if(ctx.errors){
                ctx.body = ctx.errors;
                ctx.response.status = 400;
            }else{
                const result = await resultService.deleteResult(resId);
                ctx.body = { message:"deleted successfully" }
            }
            
        } catch (error) {
            ctx.body = { message:error.message }
        }
    }
}