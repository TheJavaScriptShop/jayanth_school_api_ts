import { Context } from 'koa';
import { StudentService } from '../services/student';


export default class StudentController {

    public static async createNewStudent(ctx: Context) {

        const studentService = new StudentService();

        try {
            ctx.checkBody('enrollmentId').notEmpty("please provide Enrollment ID of the student")
            ctx.checkBody('name').len(3, 20, "length of name should be min:3 and max:20 characters");
            ctx.checkBody('gender').match(/m|M|male|Male|f|F|female|Female/, 'gender should be male or female');
            ctx.checkBody('sectionId').notEmpty('section ID cannot be empty').isInt("It should be number")

            if (ctx.errors) {
                ctx.body = ctx.errors;
                ctx.response.status = 400;
            } else {
                const student = await studentService.createStudent(ctx.request.body, ctx.request.body.sectionId)
                ctx.body = student;
                ctx.response.status = 200;
            }

        } catch (error) {
            ctx.body = { message: error.message }
        }
    }

    public static async updateStudent(ctx: Context) {

        const studentService = new StudentService();

        try {
            const { id, enrollmentId, name, gender, sectionId} = ctx.request.body;

            ctx.checkBody('enrollmentId').notEmpty('Please provide enrollmentId').isInt("It should be number")
            ctx.checkBody('name').optional().len(3, 20, "student name should be minimum of 3 characters and max of 20 characters")
            ctx.checkBody('section').optional().notEmpty('subject cannot be empty');
            ctx.checkBody('gender').optional().match(/m|M|male|Male|f|F|female|Female/, 'gender should be male or female');

            if (ctx.errors) {
                ctx.body = ctx.errors
                ctx.response.status = 400;
            } else {
                const updatedStudent = await studentService.updateStudent({ id, enrollmentId, name, gender }, sectionId);
                ctx.body = { student: updatedStudent, message: "updated Successfully" }
                ctx.response.status = 200
            }

        } catch (error) {
            ctx.body = { message: error.message }
        }
    }

    public static async deleteStudent(ctx: Context) {

        const studentService = new StudentService();

        try {
            const { enrollmentId } = ctx.request.body

            ctx.checkBody('enrollmentId').notEmpty('enrollmentId should not be empty').isInt('enrollmentId should be integer or number')

            if (ctx.errors) {
                ctx.body = ctx.errors
                ctx.response.status = 400
            }
            else {
                const deleteStudent = await studentService.deleteStudent(enrollmentId)
                ctx.body = { message: "deleted Successfully" };
                ctx.response.status = 200
            }

        } catch (error) {
            ctx.body = { message: error.message }
        }
    }

    public static async getStudents(ctx: Context) {

        const studentService = new StudentService();

        try {
            const data = ctx.request.body

            ctx.checkBody('data').optional().isInt('It should be a number')

            if (data === undefined) {
                const students = await studentService.getAllStudents(data)

                if (students.length <= 0) {
                    ctx.body = { message: "There are no students " }
                } else {
                    ctx.body = students;
                    ctx.response.status = 200;
                }
            } else {
                const students = await studentService.getAllStudents(data.academicYearId)

                if (students.length <= 0) {
                    ctx.body = { message: "There are no students " }
                } else {
                    ctx.body = students;
                    ctx.response.status = 200;
                }

            }

        } catch (error) {
            ctx.body = { message: error.message }
        }
    }

    public static async getOneStudent(ctx: Context) {

        const studentService = new StudentService();

        try {
            const enrollmentId = ctx.request.body
            ctx.checkBody('enrollmentId').notEmpty('id cannot be empty').isInt('id should be int or number')

            if (ctx.errors) {
                ctx.body = ctx.errors
                ctx.response.status = 400
            } else {
                const student = await studentService.getStudentById(enrollmentId);

                if (!student) {
                    ctx.body = { message: " There is no student with this id " }
                    ctx.response.status = 404
                } else {
                    ctx.body = student;
                    ctx.response.status = 200;
                }

            }

        } catch (error) {
            ctx.body = { message: error.message }
        }
    }

    public static async uploadStudents(ctx: Context) {

        const studentService = new StudentService()

        try {
            const { filename } = ctx.request.body

            ctx.checkBody('filename').notEmpty('Please provide file')

            if (ctx.errors) {

                ctx.body = ctx.errors;
                ctx.response.status = 404;

            } else {
                studentService.uploadStudents(filename.name)

                ctx.body = { message: "uploaded successfully" }
            }

        } catch (error) {
            ctx.body = { message: error.message }
        }

    }

}