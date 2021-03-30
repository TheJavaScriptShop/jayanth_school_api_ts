import koa from "koa"
import { createConnection } from "typeorm";
import { studentRouter } from './routes/student'
import { subjectRoutes } from './routes/subject'
import { student_subject_router } from './routes/student_subject'
import { teacherRoutes } from './routes/teacher'
import { examRoutes } from './routes/examinations'
import { resultRoutes } from './routes/result'
import { classRoutes } from './routes/school_class'
import { sectionRoutes } from './routes/section'
import { archiveRoutes } from './routes/archive'
import { academicYearRoutes } from './routes/academicYear'
import path from 'path'

const app = new koa()
const koa_parser = require('koa-parser');

app.use(koa_parser());
require('koa-validate')(app);

app.use(studentRouter.routes());
app.use(subjectRoutes.routes());
app.use(student_subject_router.routes());
app.use(teacherRoutes.routes());
app.use(examRoutes.routes());
app.use(resultRoutes.routes());
app.use(classRoutes.routes());
app.use(sectionRoutes.routes());
app.use(archiveRoutes.routes());
app.use(academicYearRoutes.routes());

createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'schoolDB',
    entities: ['dist/entities/*.js'],
    synchronize: false,
    logging: true,
    migrations: [path.join(__dirname, 'migrations', '*.js')]
}).then(() => {
    console.log("connected successfully");
}).catch((err) => {
    console.log(err);
})

app.listen(8080, () => {
    console.log("server started")
})