import { Context } from 'koa';
import { AcademicYearServices } from '../services/academicYear'

export default class AcademicYearControllers {

    public static async createYear(ctx:Context){

        const academicYearServices = new AcademicYearServices()
        
        try {
            const { label } = ctx.request.body

            ctx.checkBody('label').notEmpty('Please provide label')

            if(ctx.errors){
                ctx.response.status = 400;
                ctx.body = ctx.errors
            }else{
                const newYear = await academicYearServices.createYear(label)
                ctx.body = { message: "success", newYear }
            }

        } catch (error) {
            ctx.body = { message: error.message }            
        }

    }

}