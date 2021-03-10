import { Context } from 'koa';
import { identity } from 'lodash';
import {TeacherService} from '../services/teacher'

export default class TeacherControllers{
    public static async createTeacher(ctx:Context){
        const teacherService = new TeacherService()
        try {
            const {id,name,gender,subject} = ctx.request.body
            const newTeacher = await teacherService.create({id,name,gender,subject})
            ctx.body = newTeacher
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
            const updatedTeacher = await teacherService.updateTeacher({id,name,gender,subject})
            ctx.body = updatedTeacher
        } catch (error) {
            console.log(error)
        }
    }

    public static async deleteTeacher(ctx:Context){
        const teacherService = new TeacherService()
        try {
            const {id} = ctx.request.body;
            const deletedTeacher = await teacherService.deleteTeacher(id);
            ctx.body = "deleted Succesfully"
        } catch (error) {
            console.log(error)
        }
    }
}