import TeacherControllers from '../controllers/teacher'
import  Router from 'koa-router'
const teacherRoutes = new Router()

teacherRoutes.post('/teacher/create', TeacherControllers.createTeacher)

teacherRoutes.get('/teacher/getone', TeacherControllers.getSingleTeacher)

teacherRoutes.get('/teacher/getall', TeacherControllers.getAllTeachers)

teacherRoutes.put('/teacher/update', TeacherControllers.updateTeacher)

teacherRoutes.delete('/teacher/delete', TeacherControllers.deleteTeacher)

export {teacherRoutes}