import { Context } from 'koa';
import {StudentService} from '../services/student';


export default class StudentController{
    public static async createNewStudent(ctx:Context){
        const studentservice = new StudentService();
        try {
            // const {name, subject, gender } = ctx.request.body;
            ctx.checkBody('name').len(3,20,"length of name should be min:3 and max:20 characters");
            ctx.checkBody('subject').notEmpty('subject should not be empty');
            ctx.checkBody('gender').match(/m|M|male|Male|f|F|female|Female/,'gender should be male or female');
            if (ctx.errors) {
                ctx.body = ctx.errors;
            } else {
                const student = await studentservice.createStudent(ctx.request.body)
                ctx.body = student
            }
        } catch (error) {
            console.log(error)
        }
    }

    public static async updateStudent(ctx:Context){
        const studentservice = new StudentService();
        try {
            const {id, name, subject, gender } = ctx.request.body;
            ctx.checkBody('name').len(3,20,"student name should be minimum of 3 characters and max of 20 characters")
            ctx.checkBody('subject').optional().notEmpty('subject cannot be empty');
            ctx.checkBody('gender').match(/m|M|male|Male|f|F|female|Female/,'gender should be male or female');
            if(ctx.errors){
                ctx.body = ctx.errors
            }else{
                const updatedStudent = await studentservice.updateStudent({id, name, subject, gender });
                ctx.body = updatedStudent;
            }
        } catch (error) {
            console.log(error)
        }
    }

    public static async deleteStudent(ctx:Context){
        const studentservice = new StudentService();
        try {
            const {id} = ctx.request.body;
            ctx.checkBody('id').notEmpty('student Id should not be empty').isInt('id should be integer or number')
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