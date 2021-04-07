import ArchiveController from '../controllers/archive'
import Router from 'koa-router'
const archiveRoutes = new Router()

archiveRoutes.post('/archive', ArchiveController.archive);

archiveRoutes.get('/archive/student/get', ArchiveController.getStudent)

export { archiveRoutes }