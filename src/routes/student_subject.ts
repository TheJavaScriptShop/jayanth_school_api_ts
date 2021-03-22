import Router from 'koa-router'
import Student_Subject_Controller from '../controllers/student_subject'
const student_subject_router = new Router()

student_subject_router.post('/assign', Student_Subject_Controller.assignSubject)

export { student_subject_router }