import { getManager, Repository, EntityManager } from 'typeorm'
import { Student } from '../entities/student'
import { Subject } from '../entities/subject'
import { Section } from '../entities/section'
import { StudentArchive } from '../entities/student_archive'
import { AcademicYear } from '../entities/academicYear';
import csvParser from 'csv-parser'
import * as fs from 'fs'

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
    academicYearRepository: Repository<AcademicYear>

    constructor() {
        this.studentRepository = getManager().getRepository(Student)
        this.subjectRepository = getManager().getRepository(Subject)
        this.sectionRepository = getManager().getRepository(Section)
        this.studentArchiveRepository = getManager().getRepository(StudentArchive)
        this.academicYearRepository = getManager().getRepository(AcademicYear)
    }

    public async createStudent(student: Partial<Student>, sectionId: number) {

        // const section = await this.sectionRepository.findOne({
        //     where: {
        //         id: sectionId
        //     }
        // })

        const section = await this.sectionRepository.manager.findOne(Section, { id: sectionId })

        if (!section) {
            throw new Error("No section Found");
        } else {
            const newStudent = await this.studentRepository.manager.create(Student, {
                enrollmentId: student.enrollmentId,
                name: student.name,
                gender: student.gender,
                section: section
            })

            return this.studentRepository.manager.save(newStudent);
        }
    }

    public async updateStudent(student: Partial<Student>) {

        // const updatedStudent = await this.studentRepository.findOne({
        //     where: {
        //         id: student.id
        //     }
        // })

        const updatedStudent = await this.studentRepository.manager.findOne(Student, { id: student.id })

        if (!updatedStudent) {
            throw new Error("No Student found with this ID");
        } else {
            // updatedStudent.enrollmentId = student.enrollmentId
            // updatedStudent.name = student.name;
            // updatedStudent.subject = student.subject;
            // updatedStudent.gender = student.gender;

            await this.studentRepository.manager.update(Student, student.id, {
                enrollmentId: student.enrollmentId,
                name: student.name,
                subject: student.subject,
                gender: student.gender
            })

            return this.studentRepository.manager.save(updatedStudent)
        }
    }

    public async deleteStudent(studentId: number) {

        // const student = await this.studentRepository.findOne({
        //     where: {
        //         enrollmentId: studentId
        //     }
        // })

        const student = await this.studentRepository.manager.findOne(Student, { id: studentId })

        if (!student) {
            throw new Error("There are no Student with this ID");
        } else {
            return this.studentRepository.manager.delete(Student, { studentId })
        }
    }

    public async getAllStudents(academicYearId: number) {

        if (academicYearId === undefined) {

            // const students = await this.studentRepository.find({ relations: ["subject", "section", "section.schoolClass"] });

            const students = await this.studentRepository.manager.find(Student, {
                relations: ["subject", "section", "section.schoolClass"]
            })

            if (students.length <= 0) {
                throw new Error("There are no students");
            } else {
                return students;
            }

        } else {

            // const pastStudents = await this.studentArchiveRepository.find({
            //     where: {
            //         academicYear: academicYearId
            //     }, relations: ["subject", "section", "section.schoolClass"]
            // })

            const pastStudents = await this.studentArchiveRepository.manager.find(StudentArchive, {
                where: { id: academicYearId },
                relations: ["subject", "section", "section.schoolClass"]
            })

            if (pastStudents.length <= 0) {
                throw new Error("There are no students in this Year");
            } else {
                return pastStudents;
            }
        }
    }

    public async getStudentById(student: Partial<Student>) {

        // const newStudent = await this.studentRepository.findOne({
        //     where: {
        //         id: student.id
        //     },
        //     relations: ["subject", "section", "section.schoolClass"]
        // })

        const newStudent = await this.studentRepository.manager.findOne(Student, {
            where: { enrollmentId: student.enrollmentId },
            relations: ["subject", "section", "section.schoolClass"]
        })

        if (!newStudent) {
            throw new Error("No student found with this ID");
        } else {
            return newStudent;
        }

    }

    public async uploadStudents(filename: string) {
        const students = [];

        console.log(filename)
        fs.createReadStream(`./src/uploads/${filename}`)
            .pipe(csvParser({}))
            .on('data', (data) => students.push(data))
            .on('end', () => {
                this.studentRepository.save(students)
                console.log('done')
            })
    }
}