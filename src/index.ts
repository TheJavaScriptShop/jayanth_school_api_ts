import koa from "koa"
import { createConnection } from "typeorm";
import {studentRouter} from './routes/student'
import {subjectRoutes} from './routes/subject'
import {student_subject_router} from './routes/student_subject'
import {teacherRoutes} from './routes/teacher'
import path from 'path'
const app = new koa()
const koa_parser = require('koa-parser');


app.use(koa_parser());
// app.use(ctx=>{
//     ctx.body="hello world"
// });

app.use(studentRouter.routes());
app.use(subjectRoutes.routes());
app.use(student_subject_router.routes());
app.use(teacherRoutes.routes());

createConnection({
    type:'postgres',
    host:'localhost',
    port:5432,
    database:'schoolDB',
    entities:['dist/entities/*.js'],
    synchronize:false,
    logging:true,
    migrations:[path.join(__dirname, 'migrations', '*.js')]
}).then(()=>{
    console.log("connected successfully");
}).catch((err)=>{
    console.log(err);
})

app.listen(8080, ()=>{
    console.log("server started")
})