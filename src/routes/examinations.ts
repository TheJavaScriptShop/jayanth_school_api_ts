import ExamControllers from '../controllers/examinations'
import  Router from 'koa-router'
const examRoutes = new Router()

examRoutes.post('/create/exam',ExamControllers.createExam);

examRoutes.put('/update/exam',ExamControllers.updateExam);

examRoutes.get('/get/exam',ExamControllers.getSingleExam);

examRoutes.get('/get/allexams',ExamControllers.getExams);

examRoutes.delete('/delete/exam',ExamControllers.deleteExam);

export {examRoutes}