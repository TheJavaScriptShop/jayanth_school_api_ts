import ExamControllers from '../controllers/examinations'
import Router from 'koa-router'
const examRoutes = new Router()

examRoutes.post('/exam/create', ExamControllers.createExam);

examRoutes.put('/exam/update', ExamControllers.updateExam);

examRoutes.get('/exam/getone', ExamControllers.getSingleExam);

examRoutes.get('/exam/getall', ExamControllers.getExams);

examRoutes.delete('/exam/delete', ExamControllers.deleteExam);

export { examRoutes }