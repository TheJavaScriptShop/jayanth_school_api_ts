import Router from 'koa-router'
import SubjectController from '../controllers/subject'
const subjectRoutes = new Router();

subjectRoutes.post('/subject/create', SubjectController.createNewSubject);

subjectRoutes.get('/subject/getall', SubjectController.getSubjects);

subjectRoutes.get('/subject/getone', SubjectController.getSingleSubject);

subjectRoutes.put('/subject/update', SubjectController.updateSubject);

subjectRoutes.delete('/subject/delete', SubjectController.deleteSubject);

export { subjectRoutes }