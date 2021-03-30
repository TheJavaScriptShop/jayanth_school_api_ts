import { Repository, getManager } from 'typeorm'
import { Examinations } from '../entities/examinations'
import { Teacher } from '../entities/teacher'
import { Subject } from '../entities/subject'

export class ExamService {

    examRespository: Repository<Examinations>
    teacherRepository: Repository<Teacher>
    subjectRepository: Repository<Subject>

    constructor() {
        this.examRespository = getManager().getRepository(Examinations)
        this.teacherRepository = getManager().getRepository(Teacher)
        this.subjectRepository = getManager().getRepository(Subject)
    }

    public async createExam(examinations: Partial<Examinations>, teacherId: number, subjectId: number) {

        const assignTeacher = await this.teacherRepository.findOne({
            where: {
                id: teacherId
            }
        })

        if (!assignTeacher) {

            throw new Error("Teacher not found");

        }
        const subject = await this.subjectRepository.findOne({
            where: {
                id: subjectId
            }
        })
        if (!subject) {

            throw new Error("Subject not found");

        }
        const exam = await this.examRespository.create({
            id: examinations.id,
            exam_name: examinations.exam_name,
            subject_name: subject.name,
            total_marks: examinations.total_marks,
            max_time: examinations.max_time,
            teacher: assignTeacher
        })

        return this.examRespository.save(exam);
    }

    public async updateExam(exam: Partial<Examinations>, teacherId: number, subjectId: number) {

        const updateExam = await this.examRespository.findOne({
            where: {
                id: exam.id
            }
        })
        const subject = await this.subjectRepository.findOne({
            where: {
                id: subjectId
            }
        })
        const teacher = await this.teacherRepository.findOne({
            where: {
                id: teacherId
            }
        })

        if (!updateExam || !subject || !teacher) {
            throw new Error(`Not found`);
        } else {
            updateExam.exam_name = exam.exam_name
            updateExam.subject_name = subject.name
            updateExam.total_marks = exam.total_marks
            updateExam.max_time = exam.max_time
            updateExam.teacher = teacher
        }
        return this.examRespository.save(updateExam)
    }

    public async getOneExam(examId: number) {

        const exam = this.examRespository.findOne({
            where: {
                id: examId
            }, relations: ['teacher']
        })
        if (!exam) {
            throw new Error("There is no exam with this ID");
        } else {
            return exam
        }
    }

    public async getAllExams() {

        const exams = await this.examRespository.find({ relations: ['teacher'] })

        if (exams.length <= 0) {
            throw new Error('There are no exams')
        } else {
            return exams
        }
    }

    public async deleteExam(examId: number) {

        const exam = await this.examRespository.findOne({
            where: {
                id: examId
            }
        })

        if (!exam) {
            throw new Error("Exam not found may be deleted");
        } else {
            return this.examRespository.delete(exam);
        }
    }
}