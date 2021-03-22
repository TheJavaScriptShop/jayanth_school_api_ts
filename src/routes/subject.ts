import Router from 'koa-router'
import SubjectControllers from '../controllers/subject'
const subjectRoutes = new Router();

subjectRoutes.post('/subject/create', SubjectControllers.createNewSubject);

subjectRoutes.get('/subject/getall', SubjectControllers.getSubjects);

subjectRoutes.get('/subject/getone', SubjectControllers.getSingleSubject);

subjectRoutes.put('/subject/update', SubjectControllers.updateSubject);

subjectRoutes.delete('/subject/delete', SubjectControllers.deleteSubject);

export { subjectRoutes }