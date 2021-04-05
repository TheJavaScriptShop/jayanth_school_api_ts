import { Context } from "koa"
import { ClassService } from '../services/school_class'

export default class ClassController {

    public static async createClass(ctx: Context) {

        const classService = new ClassService()

        try {
            const { id, className, section } = ctx.request.body

            ctx.checkBody('id').optional().notEmpty('Id cannot be empty').isInt('It should be a number')
            ctx.checkBody('className').notEmpty('It cannot be empty')
            ctx.checkBody('section').optional().notEmpty('section cannot empty')

            if (ctx.errors) {
                ctx.body = ctx.errors
                ctx.response.status = 400
            } else {
                const newClass = await classService.createClass({ id, className, section })
                ctx.body = newClass
            }

        } catch (error) {
            ctx.body = { message: error.message }
        }

    }

    public static async getOneClass(ctx: Context) {

        const classService = new ClassService()

        try {
            const { classId } = ctx.request.body

            ctx.checkBody('classId').notEmpty("Please provide Class ID").isInt("class Id should be number")

            if (ctx.errors) {
                ctx.body = ctx.errors
                ctx.response.status = 400
            } else {
                const singleClass = await classService.getSingleClass(classId)
                ctx.body = { message: "Success", singleClass }
            }

        } catch (error) {
            ctx.body = { message: error.message }
        }

    }

    public static async getAll(ctx: Context) {

        const classService = new ClassService()

        try {

            const academicYearId = ctx.request.body

            ctx.checkBody('academicYearId').optional().isInt('It should be a number')

            if (academicYearId === undefined) {

                const classes = await classService.getAllClasses(academicYearId)

                ctx.body = { message: "Success", classes }
            } else {
                const pastClasses = await classService.getAllClasses(academicYearId.academicYearId)

                ctx.body = { message: 'success', pastClasses }
            }

        } catch (error) {
            ctx.body = { message: error.message }
        }

    }

    public static async updateClass(ctx: Context) {

        const classService = new ClassService()

        try {
            const { id, className, section } = ctx.request.body

            ctx.checkBody('id').notEmpty('Please provide class ID').isInt("Id should be number")
            ctx.checkBody('className').optional().notEmpty('Please provide className')
            ctx.checkBody('section').optional().notEmpty('Please provide section')

            if (ctx.errors) {
                ctx.body = ctx.errors
                ctx.response.status = 400
            } else {
                const updatedClass = await classService.updateClass({ id, className, section })
                ctx.body = { message: "updated Successfully", updatedClass }
            }

        } catch (error) {
            ctx.body = { message: error.message }
        }

    }

    public static async deleteClass(ctx: Context) {

        const classService = new ClassService()

        try {
            const { classId } = ctx.request.body

            ctx.checkBody('classId').notEmpty('Please Provide clsId')

            if (ctx.errors) {
                ctx.body = ctx.errors
                ctx.response.status = 400
            } else {
                const deleteClass = await classService.deleteClass(classId)
                ctx.body = { message: "deleted Successfully" }
            }

        } catch (error) {
            ctx.body = { message: error.message }
        }

    }

}