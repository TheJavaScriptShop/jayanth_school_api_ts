import { Context } from 'koa';
import {StudentService} from '../services/student';


export default class StudentController{
    public static async createNewStudent(ctx:Context){
        const studentservice = new StudentService();
        try {
            const {name, subject, gender } = ctx.request.body;
            ctx.checkBody(name).len(2, 20, "Name is invalid");
            if (ctx.errors) {
                ctx.body = ctx.errors;
            } else {
                const student = await studentservice.createStudent({name, subject, gender})
                ctx.body = student;
            }
        } catch (error) {
            console.log(error)
        }
    }

    public static async updateStudent(ctx:Context){
        const studentservice = new StudentService();
        try {
            const {id, name, subject, gender } = ctx.request.body;
            ctx
            const updatedStudent = await studentservice.updateStudent({id, name, subject, gender});
            ctx.body = updatedStudent;
        } catch (error) {
            console.log(error)
        }
    }

    public static async deleteStudent(ctx:Context){
        const studentservice = new StudentService();
        try {
            const {id} = ctx.request.body;
            const deleteStudent = await studentservice.deleteStudent({id})
            ctx.body = "deleted Successfully";
        } catch (error) {
            console.log(error)
        }
    }

    public static async getStudents(ctx:Context){
        const studentservice = new StudentService();
        try {
            const students = await studentservice.getAllStudents()
            ctx.body = students;
        } catch (error) {
            console.log(error)
        }
    }

    public static async getOneStudent(ctx:Context){
        const studentservice = new StudentService();
        try {
            const {id} = ctx.request.body
            const student = await studentservice.getStudentById({id});
            ctx.body = student;
        } catch (error) {
            console.log(error)
        }
    }

}