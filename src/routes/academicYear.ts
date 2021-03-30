import AcademicYearControllers from '../controllers/academicYear'
import Router from 'koa-router'
const academicYearRoutes = new Router()

academicYearRoutes.post('/academicyear/create', AcademicYearControllers.createYear);

export { academicYearRoutes }