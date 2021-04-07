import { Context } from 'koa';
import { ExamService } from '../services/examinations'

export default class ExamController {

    public static async createExam(ctx: Context) {

        const examService = new ExamService()

        try {
            const { id, examName, subjectId, totalMarks, maxTime, teacherId } = ctx.request.body

            ctx.checkBody('id').optional().isInt('id should be a number');
            ctx.checkBody('examName').notEmpty('exam name cannot be empty');
            ctx.checkBody('subjectId').notEmpty('subject Id cannot be empty').isInt('subject Id should be number')
            ctx.checkBody('totalMarks').notEmpty('total marks cannot be empty').isInt('total marks should be a number')
            ctx.checkBody('maxTime').notEmpty('max_time cannot be empty').isInt('max_time should only contain numbers and alphabets')
            ctx.checkBody('teacherId').notEmpty('teacher id cannot be empty').isInt('teacher id should be number')

            if (ctx.errors) {
                ctx.body = ctx.errors;
                ctx.response.status = 400;
            }
            else {
                const exam = await examService.createExam({ examName, totalMarks, maxTime }, teacherId, subjectId)
                ctx.body = exam
            }

        } catch (error) {
            ctx.body = { message: error.message }
        }
    }

    public static async updateExam(ctx: Context) {

        const examService = new ExamService();

        try {
            const { id, examName, subjectId, totalMarks, maxTime, teacherId } = ctx.request.body;

            ctx.checkBody('id').optional().isInt('id should be a number');
            ctx.checkBody('examName').optional().notEmpty('exam name cannot be empty');
            ctx.checkBody('subjectId').optional().notEmpty('subject Id cannot be empty').isInt('subject Id should be number')
            ctx.checkBody('totalMarks').optional().notEmpty('total marks cannot be empty').isInt('total marks should be a number')
            ctx.checkBody('maxTime').optional().notEmpty('max_time cannot be empty').isInt('max_time should only contain numbers and alphabets')
            ctx.checkBody('teacherId').optional().notEmpty('teacher id cannot be empty').isInt('teacher id should be number')

            if (ctx.errors) {
                ctx.body = ctx.errors;
                ctx.response.status = 400;
            }
            else {
                const updatedExam = await examService.updateExam({ id, examName, totalMarks, maxTime }, teacherId, subjectId)
                ctx.body = { message: "Updated Successfully", updatedExam }
            }

        } catch (error) {
            ctx.body = { message: error.message }
        }
    }

    public static async getSingleExam(ctx: Context) {

        const examService = new ExamService();

        try {
            const { examId } = ctx.request.body;

            ctx.checkBody('examId').notEmpty('This cannot be empty').isInt('This should be a number')

            if (ctx.errors) {
                ctx.body = ctx.errors
                ctx.response.status = 400
            } else {
                const exam = await examService.getOneExam(examId)
                ctx.body = exam
            }

        } catch (error) {
            ctx.body = { message: error.message }
        }
    }

    public static async getExams(ctx: Context) {

        const examService = new ExamService();

        try {
            const data = ctx.request.body

            ctx.checkBody('data').optional().isInt('It should be a number')

            if (data === undefined) {
                const exams = await examService.getAllExams(data);
                ctx.body = { message: "Success", exams }
            } else {
                const pastExams = await examService.getAllExams(data.academicYearId)
                ctx.body = { message: "success", pastExams }
            }


        } catch (error) {
            ctx.body = { message: error.message }
        }
    }

    public static async deleteExam(ctx: Context) {

        const examService = new ExamService();
        const { examId } = ctx.request.body

        ctx.checkBody('examId').notEmpty('It cannot be empty').isInt('It should be number')

        if (ctx.errors) {
            ctx.body = ctx.errors
            ctx.response.status = 400
        } else {

            try {
                const exam = await examService.deleteExam(examId)
                ctx.body = { message: "deleted successfully" }

            } catch (error) {
                ctx.body = { message: error.message }
            }

        }
    }
}