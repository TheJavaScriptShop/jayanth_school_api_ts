import Router from 'koa-router'
import ClassController from '../controllers/school_class'

const classRoutes = new Router()

classRoutes.post('/class/create', ClassController.createClass)

classRoutes.get('/class/getone', ClassController.getOneClass)

classRoutes.get('/class/getall', ClassController.getAll)

classRoutes.put('/class/update', ClassController.updateClass)

classRoutes.delete('/class/delete', ClassController.deleteClass)

export { classRoutes }