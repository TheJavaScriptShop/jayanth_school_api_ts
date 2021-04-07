import ExamController from '../controllers/examinations'
import Router from 'koa-router'
const examRoutes = new Router()

examRoutes.post('/exam/create', ExamController.createExam);

examRoutes.put('/exam/update', ExamController.updateExam);

examRoutes.get('/exam/getone', ExamController.getSingleExam);

examRoutes.get('/exam/getall', ExamController.getExams);

examRoutes.delete('/exam/delete', ExamController.deleteExam);

export { examRoutes }