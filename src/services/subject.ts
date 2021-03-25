import { getManager, Repository } from 'typeorm'
import { Subject } from '../entities/subject'
import { Teacher } from '../entities/teacher'


export class SubjectService {

    subjectRepository: Repository<Subject>
    teacherRepository: Repository<Teacher>

    constructor() {
        this.subjectRepository = getManager().getRepository(Subject);
        this.teacherRepository = getManager().getRepository(Teacher)
    }

    public async create(subject: Partial<Subject>, teacherId: number) {

        const assignteacher = await this.teacherRepository.findOne({
            where: {
                id: teacherId
            }
        })
        const newSubject = await this.subjectRepository.create({
            name: subject.name,
            student: subject.student,
            teacher: assignteacher
        })

        return this.subjectRepository.save(newSubject);
    }

    public async getSubjects() {

        const subjects = await this.subjectRepository.find({ relations: ["student", 'teacher'] });

        if(subjects.length<=0){
            throw new Error("No subjects Found");
        }else{
            return subjects
        }

    }

    public async getSubjectById(subjectId: number) {

        const subject = await this.subjectRepository.findOne({
            where: {
                id: subjectId
            },
            relations: ['student', 'teacher']
        })

        return subject
    }

    public async updateSubject(subject: Partial<Subject>, teacherId: number) {

        const updatedSubject = await this.subjectRepository.findOne({
            where: {
                id: subject.id
            }
        })
        const assignTeacher = await this.teacherRepository.findOne({
            where: {
                id: teacherId
            }
        })
        if (!updatedSubject) {
            throw new Error("No subject found with this ID");
        } else {
            updatedSubject.id = subject.id;
            updatedSubject.name = subject.name;
            updatedSubject.student = subject.student;
            updatedSubject.teacher = assignTeacher

            return this.subjectRepository.save(updatedSubject);
        }
    }

    public async deleteSubject(subjectId: number) {

        const subject = await this.subjectRepository.findOne({
            where: {
                id: subjectId
            }
        })

        if (!subject) {
            throw new Error("There are no subject with this ID");
        } else {
            this.subjectRepository.delete(subject)
        }
    }
}