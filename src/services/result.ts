import { getManager, Repository } from 'typeorm'
import { Result } from '../entities/result'
import { Student } from '../entities/student'
import { Examinations } from '../entities/examinations'
import { ResultArchive } from '../entities/result_archive'

export class ResultService {

    resultRepository: Repository<Result>
    studentRepository: Repository<Student>
    examRepository: Repository<Examinations>
    resultArchiveRepository: Repository<ResultArchive>

    constructor() {
        this.resultRepository = getManager().getRepository(Result)
        this.studentRepository = getManager().getRepository(Student)
        this.examRepository = getManager().getRepository(Examinations)
        this.resultArchiveRepository = getManager().getRepository(ResultArchive)
    }

    public async createResult(studentId: string, examId: number, marks: number) {

        const student = await this.studentRepository.findOne({
            where: {
                enrollmentId: studentId
            }
        })
        if (!student) {
            throw new Error("NO student Found with this ID");
        } else {
            const exam = await this.examRepository.findOne({
                where: {
                    id: examId
                }
            })
            if (!exam) {
                throw new Error('No exam Found')
            } else {
                const result = await this.resultRepository.create({
                    marks: marks,
                    student: { id: student.id },
                    exam: exam
                })

                return this.resultRepository.save(result)
            }
        }
    }

    public async updateResult(resultId: number, examId: number, studentId: number, marks: number) {

        const updateResult = await this.resultRepository.findOne({
            id: resultId
        })

        if (!updateResult) {
            throw new Error("result with this ID doesnot Exist");
        }

        const exam = await this.examRepository.findOne({
            where: {
                id: examId
            }
        })

        if (!exam) {
            throw new Error("Exam with this ID does not exist")
        }

        const student = await this.studentRepository.findOne({
            where: {
                id: studentId
            }
        })

        if (!student) {
            throw new Error("Student with this ID does not exists")
        }

        updateResult.marks = marks,
            updateResult.exam = exam,
            updateResult.student = student

        return this.resultRepository.save(updateResult)
    }

    public async getOneResult(studentId: number, examId: number) {

        const student = await this.resultRepository.findOne({
            where: {
                student: studentId
            }, relations: ['student']
        })
        if (!student) {
            throw new Error("No student found with this ID");
        } else {
            const exam = await this.resultRepository.findOne({
                where: {
                    exam: examId
                }, relations: ['exam']
            })
            if (!exam) {
                throw new Error("No exam found with this name");
            } else {
                return { student, exam }
            }
        }
    }

    public async getResults(academicYearId: number) {
        if (academicYearId === undefined) {
            const results = await this.resultRepository.find({ relations: ['student', 'exam'] })

            if (results.length <= 0) {
                throw new Error("No results found");
            } else {
                return results
            }
        } else {
            const pastResults = await this.resultArchiveRepository.find({
                where: {
                    academicYear: academicYearId
                }, relations: ['student', 'exam']
            })

            if (pastResults.length <= 0) {
                throw new Error("There are no Results in this year");
            } else {
                return pastResults
            }
        }

    }

    public async deleteResult(resultId: number) {

        const result = await this.resultRepository.findOne({
            where: {
                id: resultId
            }
        })

        if (!result) {
            throw new Error("No result found");

        } else {
            return this.resultRepository.delete(result.id)
        }

    }
}