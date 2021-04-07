import { Context } from 'koa';
import { ArchiveService } from '../services/archive'

export default class ArchiveController {

    public static async archive(ctx: Context) {

        const archiveService = new ArchiveService()

        try {
            const { academicId } = ctx.request.body

            ctx.checkBody('academicId').notEmpty('Please Provide academic ID').isInt('It should be integer')
            if (ctx.errors) {
                ctx.response.status = 400;
                ctx.body = ctx.errors
            } else {
                await archiveService.archive(academicId)
                ctx.body = { message: "Done" }
            }

        } catch (error) {
            ctx.body = { message: error.message }
        }

    }

    public static async getStudent(ctx: Context) {

        const archiveService = new ArchiveService()

        try {
            const { studentId } = ctx.request.body

            ctx.checkBody('studentId').notEmpty('Please provide StudentID').isInt('It should be a number')

            if (ctx.errors) {
                ctx.response.status = 400
                ctx.body = ctx.errors
            } else {
                const student = await archiveService.getStudent(studentId)
                ctx.body = student
            }
        } catch (error) {
            ctx.body = { message: error.message }
        }

    }

}