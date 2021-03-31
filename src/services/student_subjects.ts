import { getManager, Repository } from 'typeorm'
import { Student } from '../entities/student'
import { Subject } from '../entities/subject'

export class StudentSubjectService {

    studentRepository: Repository<Student>
    subjectRepository: Repository<Subject>

    constructor() {
        this.studentRepository = getManager().getRepository(Student);
        this.subjectRepository = getManager().getRepository(Subject);
    }

    public async assignSubject(studentId: string, subjectId: number) {

        const student = await this.studentRepository.findOne({
            where: {
                enrollmentId: studentId
            },
            relations: ["subject"]
        })

        const subject = await this.subjectRepository.findOne({
            where: {
                id: subjectId
            }
        })

        student.subject = [subject, ...student.subject]

        return this.studentRepository.save(student);
    }

}
