import Router from 'koa-router'
import ResultControllers from '../controllers/result'
const resultRoutes = new Router()

resultRoutes.post('/result/create',ResultControllers.addResult)

resultRoutes.put('/result/update',ResultControllers.updateResult)

resultRoutes.get('/result/getsingleresult',ResultControllers.getResult)

resultRoutes.get('/result/getall',ResultControllers.getResults)

resultRoutes.delete('/result/delete',ResultControllers.deleteResult)

export {resultRoutes}