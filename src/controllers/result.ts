import { Context } from "koa"
import { ResultService } from '../services/result'

export default class ResultControllers {

    public static async addResult(ctx: Context) {

        const resultService = new ResultService()

        try {
            const { marks, studentId, examId } = ctx.request.body

            ctx.checkBody('marks').notEmpty('marks cannot be empty')
            ctx.checkBody('studentId').notEmpty('student id cannot be empty').isInt('it should be number')
            ctx.checkBody('examId').notEmpty('it cannot be empty').isInt('it should be number')

            if (ctx.errors) {
                ctx.body = ctx.errors
                ctx.response.status = 400
            } else {
                const result = await resultService.createResult(studentId, examId, marks)
                ctx.body = result
            }

        } catch (error) {
            ctx.body = { message: error.message }
        }
    }

    public static async updateResult(ctx: Context) {

        const resultService = new ResultService();

        try {
            const { resultId, examId, studentId, marks } = ctx.request.body;

            ctx.checkBody('resultId').optional().notEmpty('It cannot be empty').isInt('It should be a number')
            ctx.checkBody('examId').optional().notEmpty('It cannot be empty').isInt('It should be a number')
            ctx.checkBody('studentId').optional().notEmpty('It cannot be empty').isInt('It should be a number')
            ctx.checkBody('marks').optional().notEmpty('It cannot be empty').isInt('It should be a number')

            if (ctx.errors) {
                ctx.body = ctx.errors;
                ctx.response.status = 400;
            } else {
                const updatedStudent = await resultService.updateResult(resultId, examId, studentId, marks);
                ctx.body = { message: "updated Successfully", updatedStudent }
            }

        } catch (error) {
            ctx.body = { message: error.message }
        }
    }

    public static async getResult(ctx: Context) {

        const resultService = new ResultService()

        try {
            const { studentId, examId } = ctx.request.body

            ctx.checkBody('studentId').notEmpty('It cannot be empty').isInt('It should be a number');
            ctx.checkBody('examId').notEmpty('It cannot be empty')
            if (ctx.errors) {
                ctx.body = ctx.errors;
                ctx.response.status = 400;
            } else {
                const result = await resultService.getOneResult(studentId, examId);
                ctx.body = result
            }

        } catch (error) {
            ctx.body = { message: error.message }
        }
    }

    public static async getResults(ctx: Context) {

        const resultService = new ResultService()

        try {
            const results = await resultService.getResults()

            ctx.body = { message: "Success", results }
        } catch (error) {
            ctx.body = { message: error.message }
        }
    }

    public static async deleteResult(ctx: Context) {

        const resultService = new ResultService()

        try {
            const { resultId } = ctx.request.body;
            ctx.checkBody('resultId').notEmpty('This cannot be empty').isInt('It should be a number')

            if (ctx.errors) {
                ctx.body = ctx.errors;
                ctx.response.status = 400;
            } else {
                const result = await resultService.deleteResult(resultId);
                ctx.body = { message: "deleted successfully" }
            }

        } catch (error) {
            ctx.body = { message: error.message }
        }
    }
}