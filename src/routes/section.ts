import Router from 'koa-router'
import SectionController from '../controllers/section'

const sectionRoutes = new Router()

sectionRoutes.post('/section/create', SectionController.createSubject);

sectionRoutes.get('/section/getone', SectionController.getSingleSection);

sectionRoutes.get('/section/getall', SectionController.getSections);

sectionRoutes.put('/section/update', SectionController.updateSection);

sectionRoutes.delete('/section/delete', SectionController.deleteSection);

export { sectionRoutes }