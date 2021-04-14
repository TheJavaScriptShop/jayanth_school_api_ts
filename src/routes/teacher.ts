import TeacherController from '../controllers/teacher'
import Router from 'koa-router'
const teacherRoutes = new Router()

teacherRoutes.post('/teacher/create', TeacherController.createTeacher)

teacherRoutes.get('/teacher/getone', TeacherController.getSingleTeacher)

teacherRoutes.get('/teacher/getall', TeacherController.getAllTeachers)

teacherRoutes.put('/teacher/update', TeacherController.updateTeacher)

teacherRoutes.delete('/teacher/delete', TeacherController.deleteTeacher)

teacherRoutes.post('/teacher/upload', TeacherController.uploadTeachers);

export { teacherRoutes }