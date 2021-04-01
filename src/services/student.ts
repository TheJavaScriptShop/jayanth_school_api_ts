import { getManager, Repository } from 'typeorm'
import { Student } from '../entities/student'
import { Subject } from '../entities/subject'
import { Section } from '../entities/section'
import { StudentArchive } from '../entities/student_archive'

export enum Gender {
    'male',
    'famale',
    'others'
}

export class StudentService {

    studentRepository: Repository<Student>;
    subjectRepository: Repository<Subject>;
    sectionRepository: Repository<Section>;
    studentArchiveRepository: Repository<StudentArchive>

    constructor() {
        this.studentRepository = getManager().getRepository(Student)
        this.subjectRepository = getManager().getRepository(Subject)
        this.sectionRepository = getManager().getRepository(Section)
        this.studentArchiveRepository = getManager().getRepository(StudentArchive)
    }

    public async createStudent(student: Partial<Student>, sectionId: number) {

        const section = await this.sectionRepository.findOne({
            where: {
                id: sectionId
            }
        })
        if (!section) {
            throw new Error("No section Found");
        } else {
            const newStudent = await this.studentRepository.create({
                enrollmentId: student.enrollmentId,
                name: student.name,
                gender: student.gender,
                section: section
            })

            return this.studentRepository.save(newStudent);
        }
    }

    public async updateStudent(student: Partial<Student>) {

        const updatedStudent = await this.studentRepository.findOne({
            where: {
                id: student.id
            }
        })
        if (!updatedStudent) {
            throw new Error("No Student found with this ID");
        } else {
            updatedStudent.enrollmentId = student.enrollmentId
            updatedStudent.name = student.name;
            updatedStudent.subject = student.subject;
            updatedStudent.gender = student.gender;

            return this.studentRepository.save(updatedStudent)
        }
    }

    public async deleteStudent(studentId: number) {

        const student = await this.studentRepository.findOne({
            where: {
                enrollmentId: studentId
            }
        })

        if (!student) {
            throw new Error("There are no Student with this ID");
        } else {
            return this.studentRepository.delete(student.id)
        }
    }

    public async getAllStudents() {

        const students = await this.studentRepository.find({ relations: ["subject", "section", "section.schoolClass"] });

        if (students.length <= 0) {
            throw new Error("There are no students");
        } else {
            return students;
        }

    }

    public async getStudentById(s: Partial<Student>) {

        const student = await this.studentRepository.findOne({
            where: {
                id: s.id
            },
            relations: ["subject", "section", "section.schoolClass"]
        })

        if (!student) {
            throw new Error("No student found with this ID");
        } else {
            return student;
        }

    }
}