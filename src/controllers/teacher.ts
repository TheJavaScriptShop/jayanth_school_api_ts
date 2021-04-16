import { Context } from 'koa';
import { TeacherService } from '../services/teacher'

export default class TeacherController {

    public static async createTeacher(ctx: Context) {

        const teacherService = new TeacherService()

        try {
            const { id, name, gender, subject } = ctx.request.body

            ctx.checkBody('id').optional().notEmpty('teacher Id cannot be empty').isInt('subject id should be integer or number')
            ctx.checkBody('name').len(3, 20, 'teacher name should be min of 3 characters and max of 20 characters ')
            ctx.checkBody('gender').match(/m|M|Male|male|f|F|Female|female/, 'gender should be male or female').notEmpty('gender cannot be empty')

            if (ctx.errors) {
                ctx.body = ctx.errors
                ctx.response.status = 400;
            } else {
                const newTeacher = await teacherService.create({ id, name, gender, subject })
                ctx.body = newTeacher
                ctx.response.status = 200
            }

        } catch (error) {
            ctx.body = { message: error.message }
        }
    }

    public static async getSingleTeacher(ctx: Context) {

        const teacherService = new TeacherService()

        try {
            const { id } = ctx.request.body

            ctx.checkBody('id').notEmpty('id cannot be empty').isInt('id should be int or number')

            if (ctx.errors) {
                ctx.body = ctx.errors
                ctx.response.status = 400;
            }
            else {
                const teacher = await teacherService.getTeacher(id);

                if (!teacher) {
                    ctx.body = { message: "There are no teachers with this ID" }
                } else {
                    ctx.body = teacher;
                    ctx.response.status = 200
                }

            }

        } catch (error) {
            ctx.body = { message: error.message }
        }
    }

    public static async getAllTeachers(ctx: Context) {

        const teacherService = new TeacherService()

        try {
            const data = ctx.request.body

            ctx.checkBody('data').optional().isInt('It should be a number')

            if (data === undefined) {
                const teachers = await teacherService.getAllTeachers(data)

                if (teachers.length <= 0) {
                    ctx.body = { message: "There are no teachers " }
                } else {
                    ctx.body = teachers;
                    ctx.response.status = 200;
                }
            } else {
                const pastTeachers = await teacherService.getAllTeachers(data.academicYearId)

                if (pastTeachers.length <= 0) {
                    ctx.body = { message: "There are no pastTeachers " }
                } else {
                    ctx.body = pastTeachers;
                    ctx.response.status = 200;
                }

            }

        } catch (error) {
            ctx.body = { message: error.message }
        }
    }

    public static async updateTeacher(ctx: Context) {
        const teacherService = new TeacherService()
        try {

            const { id, name, gender } = ctx.request.body;

            ctx.checkBody('id').optional().notEmpty('teacher Id cannot be empty').isInt('subject id should be integer or number')
            ctx.checkBody('name').optional().len(3, 20, 'teacher name should be min of 3 characters and max of 20 characters ')
            ctx.checkBody('gender').optional().match(/m|M|Male|male|f|F|Female|female/, 'gender should be male or female').notEmpty('gender cannot be empty')

            if (ctx.errors) {
                ctx.body = ctx.errors
                ctx.response.status = 400
            } else {
                const updatedTeacher = await teacherService.updateTeacher({ id, name, gender })
                ctx.body = updatedTeacher
                ctx.response.status = 200
            }

        } catch (error) {
            ctx.body = { message: error.message }
        }
    }

    public static async deleteTeacher(ctx: Context) {

        const teacherService = new TeacherService()

        try {
            const { id } = ctx.request.body;
            ctx.checkBody('id').notEmpty('id cannot be null').isInt('id should be number ')

            if (ctx.errors) {
                ctx.body = ctx.errors
                ctx.response.status = 400
            }
            else {
                const deletedTeacher = await teacherService.deleteTeacher(id);
                ctx.body = "deleted Succesfully"
                ctx.response.status = 200
            }

        } catch (error) {
            ctx.body = { message: error.message }
        }
    }

    public static async uploadTeachers(ctx: Context) {

        const teacherService = new TeacherService()

        try {
            const { filename } = ctx.request.body

            ctx.checkBody('filename').notEmpty('Please provide file')

            if (ctx.errors) {

                ctx.body = ctx.errors;
                ctx.response.status = 404;

            } else {
                teacherService.uploadTeachers(filename.name)

                ctx.body = { message: "uploaded successfully" }
            }

        } catch (error) {
            ctx.body = { message: error.message }
        }

    }
}