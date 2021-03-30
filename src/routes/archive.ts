import ArchiveControllers from '../controllers/archive'
import Router from 'koa-router'
const archiveRoutes = new Router()

archiveRoutes.post('/archive/all', ArchiveControllers.archive);

archiveRoutes.get('/archive/getstudent', ArchiveControllers.getStudent)

export { archiveRoutes }