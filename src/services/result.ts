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

        const result = await this.resultrepository.create({
            marks: marks,
            student: { id: sid },
            exam: { id: examId }
        })

        return this.resultrepository.save(result)
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

    public async getOneResult(resId: number) {

        const result = await this.resultrepository.findOne({
            where: {
                id: resId
            }, relations: ['student', 'exam']
        })

        if (!result) {
            throw new Error("Result with this ID does not Exists");
        } else {
            return result
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