import StudentController from '../controllers/student';
import Router from 'koa-router';
const studentRouter = new Router()

studentRouter.post('/create',StudentController.createNewStudent);

studentRouter.put('/update',StudentController.updateStudent);

studentRouter.delete('/delete',StudentController.deleteStudent);

studentRouter.get('/getallstudents',StudentController.getStudents);

studentRouter.get('/getstudent',StudentController.getOneStudent);

export {studentRouter}