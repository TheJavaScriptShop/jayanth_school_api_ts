import { Context } from 'koa';
import {TeacherService} from '../services/teacher'

export default class TeacherControllers{
    public static async createTeacher(ctx:Context){
        const teacherService = new TeacherService()
        try {
            const {id,name,gender,subject} = ctx.request.body
            ctx.checkBody('id').optional().notEmpty('teacher Id cannot be empty').isInt('subject id should be integer or number')
            ctx.checkBody('name').len(3,20,'teacher name should be min of 3 characters and max of 20 characters ')
            ctx.checkBody('gender').match(/m|M|Male|male|f|F|Female|female/,'gender should be male or female').notEmpty('gender cannot be empty')
            ctx.checkBody('subject').len(3,20,'subject name should be min of 3 characters and max of 10 characters')
            if(ctx.errors){
                ctx.body = ctx.errors
            }else{
                const newTeacher = await teacherService.create({id,name,gender,subject})
                ctx.body = newTeacher
            }
        } catch (error) {
            console.log(error)
        }
    }

    public static async getSingleTeacher(ctx:Context){
        const teacherService = new TeacherService()
        try {
            const {id} = ctx.request.body
            const teacher = await teacherService.getTeacher(id);
            ctx.body = teacher
        } catch (error) {
            console.log(error)
        }
    }

    public static async getAllTeachers(ctx:Context){
        const teacherService = new TeacherService()
        try {
            const teachers = await teacherService.getAllTeachers()
            ctx.body = teachers
        } catch (error) {
            console.log(error)
        }
    }

    public static async updateTeacher(ctx:Context){
        const teacherService = new TeacherService()
        try {
            const {id,name,gender,subject} = ctx.request.body;
            ctx.checkBody('id').optional().notEmpty('teacher Id cannot be empty').isInt('subject id should be integer or number')
            ctx.checkBody('name').optional().len(3,20,'teacher name should be min of 3 characters and max of 20 characters ')
            ctx.checkBody('gender').optional().match(/m|M|Male|male|f|F|Female|female/,'gender should be male or female').notEmpty('gender cannot be empty')
            ctx.checkBody('subject').optional().len(3,20,'subject name should be min of 3 characters and max of 10 characters')
            if(ctx.errors){
                ctx.body = ctx.errors
            }else{
                const updatedTeacher = await teacherService.updateTeacher({id,name,gender,subject})
                ctx.body = updatedTeacher
            }
        } catch (error) {
            console.log(error)
        }
    }

    public static async deleteTeacher(ctx:Context){
        const teacherService = new TeacherService()
        try {
            const {id} = ctx.request.body;
            ctx.checkBody('id').notEmpty('id cannot be null').isInt('id should be number ')
            if(ctx.errors){
                ctx.body = ctx.errors
            }
            else{
                const deletedTeacher = await teacherService.deleteTeacher(id);
                ctx.body = "deleted Succesfully"
            }
        } catch (error) {
            console.log(error)
        }
    }
}