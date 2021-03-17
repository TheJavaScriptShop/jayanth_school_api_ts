import ExamControllers from '../controllers/examinations'
import  Router from 'koa-router'
const examRoutes = new Router()

examRoutes.post('/create/exam',ExamControllers.createExam)

export {examRoutes}