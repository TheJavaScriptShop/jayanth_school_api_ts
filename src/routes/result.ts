import Router from 'koa-router'
import ResultController from '../controllers/result'
const resultRoutes = new Router()

resultRoutes.post('/result/create', ResultController.addResult)

resultRoutes.put('/result/update', ResultController.updateResult)

resultRoutes.get('/result/getone', ResultController.getResult)

resultRoutes.get('/result/getall', ResultController.getResults)

resultRoutes.delete('/result/delete', ResultController.deleteResult)

export { resultRoutes }