import StudentController from '../controllers/student';
import Router from 'koa-router';
const studentRouter = new Router()

studentRouter.post('/student/create', StudentController.createNewStudent);

studentRouter.put('/student/update', StudentController.updateStudent);

studentRouter.delete('/student/delete', StudentController.deleteStudent);

studentRouter.get('/student/getall', StudentController.getStudents);

studentRouter.get('/student/getone', StudentController.getOneStudent);

export { studentRouter }