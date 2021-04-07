import AcademicYearController from '../controllers/academicYear'
import Router from 'koa-router'
const academicYearRoutes = new Router()

academicYearRoutes.post('/academicyear/create', AcademicYearController.createYear);

export { academicYearRoutes }