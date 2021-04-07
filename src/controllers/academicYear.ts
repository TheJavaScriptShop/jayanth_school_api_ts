import { Context } from 'koa';
import { AcademicYearService } from '../services/academicYear'

export default class AcademicYearController {

    public static async createYear(ctx: Context) {

        const academicYearService = new AcademicYearService()

        try {
            const { label } = ctx.request.body

            ctx.checkBody('label').notEmpty('Please provide label')

            if (ctx.errors) {
                ctx.response.status = 400;
                ctx.body = ctx.errors
            } else {
                const newYear = await academicYearService.createYear(label)
                ctx.body = { message: "success", newYear }
            }

        } catch (error) {
            ctx.body = { message: error.message }
        }

    }

}