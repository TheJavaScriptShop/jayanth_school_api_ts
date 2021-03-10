import Router from 'koa-router'
import SubjectControllers from '../controllers/subject'
const subjectRoutes = new Router();

subjectRoutes.post('/subject/create',SubjectControllers.createNewSubject);

subjectRoutes.get('/subject/getallsubjects',SubjectControllers.getSubjects);

subjectRoutes.get('/subject/getonesubject',SubjectControllers.getSingleSubject);

subjectRoutes.put('/subject/updatesubject',SubjectControllers.updateSubject);

subjectRoutes.delete('/subject/deletesubject',SubjectControllers.deleteSubject);

export {subjectRoutes}