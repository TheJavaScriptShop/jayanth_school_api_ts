import ArchiveControllers from '../controllers/archive'
import Router from 'koa-router'
const archiveRoutes = new Router()

archiveRoutes.post('/archive', ArchiveControllers.archive);

archiveRoutes.get('/archive/student/get', ArchiveControllers.getStudent)

export { archiveRoutes }