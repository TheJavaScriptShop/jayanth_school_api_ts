import { Repository, getManager } from 'typeorm'
import { Examinations } from '../entities/examinations'
import { Teacher } from '../entities/teacher'
import { Subject } from '../entities/subject'
import { ExaminationsArchive } from '../entities/examination_archive'

export class ExamService {

    examRespository: Repository<Examinations>
    teacherRepository: Repository<Teacher>
    subjectRepository: Repository<Subject>
    examArchiveRepository: Repository<ExaminationsArchive>

    constructor() {
        this.examRespository = getManager().getRepository(Examinations)
        this.teacherRepository = getManager().getRepository(Teacher)
        this.subjectRepository = getManager().getRepository(Subject)
        this.examArchiveRepository = getManager().getRepository(ExaminationsArchive)
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
            examName: examinations.examName,
            subjectName: subject.name,
            totalMarks: examinations.totalMarks,
            maxTime: examinations.maxTime,
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
            updateExam.examName = exam.examName
            updateExam.subjectName = subject.name
            updateExam.totalMarks = exam.totalMarks
            updateExam.maxTime = exam.maxTime
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

    public async getAllExams(academicYearId: number) {
        if (academicYearId === undefined) {
            const exams = await this.examRespository.find({ relations: ['teacher'] })

            if (exams.length <= 0) {
                throw new Error('There are no exams')
            } else {
                return exams
            }
        } else {
            const pastExams = await this.examArchiveRepository.find({
                where: {
                    academicYear: academicYearId
                }, relations: ['teacher']
            })
            if (pastExams.length <= 0) {
                throw new Error("There are no exams in this year");
            } else {
                return pastExams
            }
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
            return this.examRespository.delete(exam.id);
        }
    }
}