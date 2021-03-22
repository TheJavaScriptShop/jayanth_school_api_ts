import { Context } from "koa"
import { SectionService } from '../services/section'

export default class SectionController {

    public static async createSubject(ctx: Context) {

        const sectionService = new SectionService()

        try {
            const { id, name, clsId } = ctx.request.body

            ctx.checkBody('id').optional().notEmpty('Id cannot be empty').isInt('It should be a number')
            ctx.checkBody('name').notEmpty('Please Provide the section')
            ctx.checkBody('clsId').notEmpty('Please Provide the Class ID').isInt('It should be a number')

            if (ctx.errors) {
                ctx.body = ctx.errors
                ctx.response.status = 400
            } else {
                const newSection = await sectionService.createSection({ id, name }, clsId)
                ctx.body = { message: "Successfully created", newSection }
            }

        } catch (error) {
            ctx.body = { message: error.message }
        }

    }

    public static async getSingleSection(ctx: Context) {

        const sectionService = new SectionService()

        try {
            const { secId } = ctx.request.body

            ctx.checkBody('secId').notEmpty('Section Id cannot be empty').isInt('It should be a number')

            if (ctx.errors) {
                ctx.body = ctx.errors
                ctx.response.status = 400
            } else {
                const section = await sectionService.getOneSection(secId)
                ctx.body = section
            }

        } catch (error) {
            ctx.body = { message: error.message }
        }

    }

    public static async getSections(ctx: Context) {

        const sectionService = new SectionService()

        try {
            const sections = await sectionService.getSections()
            ctx.body = sections

        } catch (error) {
            ctx.body = { message: error.message }
        }

    }

    public static async updateSection(ctx: Context) {

        const sectionService = new SectionService()

        try {
            const { id, name, clsId } = ctx.request.body

            ctx.checkBody("id").notEmpty('Please Provide Section ID').isInt('It should be a number')
            ctx.checkBody('name').optional().notEmpty('please provide Section')
            ctx.checkBody('clsId').optional().notEmpty('please provide Class ID').isInt('It should be a number')

            if (ctx.errors) {
                ctx.body = ctx.errors
                ctx.response.status = 400
            } else {
                const updatedSection = await sectionService.updateSection({ id, name }, clsId)
                ctx.body = { message: "updated Successfully", updatedSection }

            }

        } catch (error) {
            ctx.body = { message: error.message }
        }

    }

    public static async deleteSection(ctx: Context) {

        const sectionService = new SectionService()

        try {
            const { secId } = ctx.request.body

            ctx.checkBody('secId').notEmpty('Please provide section ID').isInt('It should be number')

            if (ctx.errors) {
                ctx.body = ctx.errors
                ctx.response.status = 400
            } else {
                const deletedSection = await sectionService.deleteSection(secId)
                ctx.body = { message: "Deleted Successfully" }
            }

        } catch (error) {
            ctx.body = { message: error.message }
        }

    }

}