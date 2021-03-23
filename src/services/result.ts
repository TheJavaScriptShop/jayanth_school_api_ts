import { getManager, Repository } from 'typeorm'
import { Result } from '../entities/result'
import { Student } from '../entities/student'
import { Examinations } from '../entities/examinations'

export class ResultService {

    resultrepository: Repository<Result>
    studentrepository: Repository<Student>
    examrepository: Repository<Examinations>

    constructor() {
        this.resultrepository = getManager().getRepository(Result)
        this.studentrepository = getManager().getRepository(Student)
        this.examrepository = getManager().getRepository(Examinations)
    }

    public async createResult(sid: number, examId: number, marks: number) {

        const student = await this.studentrepository.findOne({
            where: {
                id: sid
            }
        })
        if (!student) {
            throw new Error("NO student Found with this ID");
        } else {
            const exam = await this.examrepository.findOne({
                where: {
                    id: examId
                }
            })
            if (!exam) {
                throw new Error('No exam Found')
            } else {
                const result = await this.resultrepository.create({
                    marks: marks,
                    student: student,
                    exam: exam
                })

                return this.resultrepository.save(result)
            }
        }
    }

    public async updateResult(resId: number, examId: number, sId: number, marks: number) {

        const updateResult = await this.resultrepository.findOne({
            id: resId
        })

        if (!updateResult) {
            throw new Error("result with this ID doesnot Exist");
        }

        const exam = await this.examrepository.findOne({
            where: {
                id: examId
            }
        })

        if (!exam) {
            throw new Error("Exam with this ID does not exist")
        }

        const student = await this.studentrepository.findOne({
            where: {
                id: sId
            }
        })

        if (!student) {
            throw new Error("Student with this ID does not exists")
        }

        updateResult.marks = marks,
            updateResult.exam = exam,
            updateResult.student = student

        return this.resultrepository.save(updateResult)
    }

    public async getOneResult(stId: number, exmId: number) {

        const student = await this.resultrepository.findOne({
            where: {
                student: stId
            },relations: ['student']
        })
        if(!student){
            throw new Error("No student found with this ID");
        }else{
            const exm = await this.resultrepository.findOne({
                where: {
                    exam: exmId
                }, relations: ['exam']
            })
            if(!exm){
                throw new Error("No exam found with this name");
            }else{
                return {student, exm}
            }
        }
    }

    public async getResults() {

        const results = await this.resultrepository.find({ relations: ['student', 'exam'] })

        if (results.length <= 0) {
            throw new Error("No results found");
        } else {
            return results
        }
    }

    public async deleteResult(resId: number) {

        const result = await this.resultrepository.findOne({
            where: {
                id: resId
            }
        })

        if (!result) {
            throw new Error("No result found");

        } else {
            return this.resultrepository.delete(result)
        }

    }
}