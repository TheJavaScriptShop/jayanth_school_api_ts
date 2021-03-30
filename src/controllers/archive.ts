import { Context } from 'koa';
import { ArchiveServices } from '../services/archive'

export default class ArchiveControllers {

    public static async archive(ctx: Context){

        const archiveServices = new ArchiveServices()

        try {
            const { academicId } = ctx.request.body

            ctx.checkBody('academicId').notEmpty('Please Provide academic ID').isInt('It should be integer')
            if(ctx.errors){
                ctx.response.status = 400;
                ctx.body = ctx.errors
            }else{
                await archiveServices.archive(academicId)
                 ctx.body = { message: "Done" }
            }

        } catch (error) {
           ctx.body = { message: error.message } 
        }

    }

    // public static async moveSections(ctx:Context){

    //     const archiveServices = new ArchiveServices()

    //     try {
    //         await archiveServices.moveSection()
    //         ctx.body = { message: "success" }
            
    //     } catch (error) {
    //        ctx.body = { message: error.message }
    //     }

    // }

    public static async getStudent(ctx:Context){

        const archiveServices = new ArchiveServices()

        try {
            const { studentId } = ctx.request.body

            ctx.checkBody('studentId').notEmpty('Please provide StudentID').isInt('It should be a number')

            if(ctx.errors){
                ctx.response.status = 400
                ctx.body = ctx.errors
            }else{
                const student = await archiveServices.getStudent(studentId)
                ctx.body = student
            }
        } catch (error) {
           ctx.body = { message: error.message } 
        }

    }

}