import { SubjectService } from '../services/subject'
import { Context } from 'koa';

export default class SubjectControllers{
    
    public static async createNewSubject(ctx: Context){
    
        const subjectservice = new SubjectService()
    
        try {
            const { name , student,teacherId } = ctx.request.body
    
            ctx.checkBody('name').notEmpty('subject cannot be empty').len(3,10,"subject name should not exceed 10 characters and should of 3 character minimum")
            ctx.checkBody('teacherId').isInt('teacher Id should be a number')
            ctx.checkBody('student').empty()
    
            console.log(ctx.errors)
    
            if(ctx.errors){
                ctx.body = ctx.errors
                ctx.response.status = 400
            }else{
                const subject = await subjectservice.create({ name,student },teacherId);
                ctx.body = subject;
                ctx.response.status = 200
            }
    
        } catch (error) {
            console.log(error)
        }
    }

    public static async getSubjects(ctx: Context){
      
        const subjectservice = new SubjectService()
      
        try {
            const subjects = await subjectservice.getSubjects()
            if(subjects.length<=0){
                ctx.body = { message:"There are no subjects" }
            }else{
                ctx.body = subjects
                ctx.response.status = 200
            }
      
        } catch (error) {
            console.log(error)
        }
    }

    public static async getSingleSubject(ctx: Context){
     
        const subjectservice = new SubjectService()
     
        try {
            ctx.checkBody('id').notEmpty('id cannot be empty').isInt('id should be int or number')
            if(ctx.errors){
                ctx.body = ctx.errors
                ctx.response.status = 400
            }else{
                const subject = await subjectservice.getSubjectById(ctx.request.body.id);
          
                if(!subject){
                    ctx.body = { message:"There is no subject with this ID" }
                }else{
                    ctx.body = subject
                    ctx.response.status = 200
                }
            }
        
        } catch (error) {
            console.log(error)
        }
    }

    public static async updateSubject(ctx: Context){
       
        const subjectservice = new SubjectService()
       
        try {
       
            const { id , name ,student,teacherId } = ctx.request.body
       
            ctx.checkBody('id').notEmpty('id cannot be empty').isInt('id should be an integer or number')
            ctx.checkBody('name').optional().len(3,10,'subject name should atleast 3 character and should not exceed 10 characters')
            ctx.checkBody('teacherId').optional().notEmpty('teacherId cannot be empty').isInt('teacher Id should be intger or number')
       
            if(ctx.errors){
                ctx.body = ctx.errors
                ctx.response.status = 400
            }else{
                const updatedSubject = await subjectservice.updateSubject({ id,name,student },teacherId)
                ctx.body= updatedSubject
                ctx.response.status = 200
            }
       
        } catch (error) {
            console.log(error)
        }
    }

    public static async deleteSubject(ctx: Context){
       
        const subjectservice = new SubjectService()
       
        try {
            // const id  = ctx.request.body;
            ctx.checkBody('id').notEmpty('subject Id cannot be empty').isInt('subject Id should be integer or number')
            console.log(ctx.errors)
       
            if(ctx.errors){
                ctx.body = ctx.errors
                ctx.response.status= 400
            }
            else{
                const deletedSubject = await subjectservice.deleteSubject(ctx.request.body.id)
                ctx.body = "deleted Successfully"
                ctx.response.status = 200
            }
       
        } catch (error) {
            ctx.body = { message:error.message }
            }
    }
}