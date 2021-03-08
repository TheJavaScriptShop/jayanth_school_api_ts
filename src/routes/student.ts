import StudentController from '../controllers/student';
import Router from 'koa-router';
const studentRouter = new Router()

studentRouter.post('/create',StudentController.createNewStudent);

studentRouter.put('/update',StudentController.updateNewStudent);

export {studentRouter}