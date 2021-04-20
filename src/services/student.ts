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

        const section = await this.sectionRepository.manager.createQueryBuilder()
        .select("section")
        .from(Section , 'section')
        .where('section.id = :id', {id: sectionId})
        .getOne()


        if (!section) {
            throw new Error("No section Found");
        } else {

            const newStudent = await this.studentRepository.manager.createQueryBuilder()
            .insert()
            .into(Student)
            .values([
                {
                    enrollmentId: student.enrollmentId,
                    name: student.name,
                    gender: student.gender,
                    section: section  
                }
            ])
            .output('*')
            .execute()
            
            return newStudent.generatedMaps

            // const newStudent = await this.studentRepository.manager.create(Student, {
            //     enrollmentId: student.enrollmentId,
            //     name: student.name,
            //     gender: student.gender,
            //     section: section
            // })

            // return this.studentRepository.manager.save(newStudent);
        }
    }

    public async updateStudent(student: Partial<Student>, sectionId: number) {

        // const updatedStudent = await this.studentRepository.findOne({
        //     where: {
        //         id: student.id
        //     }
        // })

        const updatedStudent = await this.studentRepository.manager.findOne(Student, { enrollmentId: student.enrollmentId })

        if (!updatedStudent) {
            throw new Error("No Student found with this ID");
        } else {
            // updatedStudent.enrollmentId = student.enrollmentId
            // updatedStudent.name = student.name;
            // updatedStudent.subject = student.subject;
            // updatedStudent.gender = student.gender;

            const section = await this.sectionRepository.manager.createQueryBuilder()
            .select("section")
            .from(Section , 'section')
            .where('section.id = :id', {id: sectionId})
            .getOne()

            if(!sectionId){
                throw new Error("No section found with this Id");
            }else{
                const newUpdatedStudent = await this.studentRepository.manager.createQueryBuilder()
                .update(Student)
                .set({
                    enrollmentId: student.enrollmentId,
                    name: student.name,
                    gender: student.gender,
                    section: section
                })
                .where('enrollmentId= :enrollmentId', { enrollmentId: student.enrollmentId })
                .output('*')
                .execute()

                return newUpdatedStudent.raw
            }
        }
    }

    public async deleteStudent(enrollmentId: number) {

        // const student = await this.studentRepository.findOne({
        //     where: {
        //         enrollmentId: studentId
        //     }
        // })

        const student = await this.studentRepository.manager.createQueryBuilder()
        .select('student')
        .from(Student, 'student')
        .where('student.enrollmentId= :enrollmentId', { enrollmentId: enrollmentId })
        .getOne()

        if (!student) {
            throw new Error("There are no Student with this ID");
        } else {
            await this.studentRepository.manager.createQueryBuilder()
            .delete()
            .from(Student)
            .where('enrollmentId = :enrollmentId', { enrollmentId: enrollmentId })
            .execute()
        }
    }

    public async getAllStudents(academicYearId: number) {

        if (academicYearId === undefined) {

            // const students = await this.studentRepository.find({ relations: ["subject", "section", "section.schoolClass"] });

            // const students = await this.studentRepository.manager.find(Student, {
            //     relations: ["subject", "section", "section.schoolClass"]
            // })

            const students = await this.studentRepository.manager.createQueryBuilder()
            .select('student')
            .from(Student,'student')
            .leftJoinAndSelect('student.section','section')
            .leftJoinAndSelect('section.schoolClass','schoolClass')
            .getMany()

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

            // const pastStudents = await this.studentArchiveRepository.manager.find(StudentArchive, {
            //     where: { id: academicYearId },
            //     relations: ["subject", "section", "section.schoolClass"]
            // })

            const pastStudents = await this.studentRepository.manager.createQueryBuilder()
            .select('studentArchive')
            .from(StudentArchive,'studentArchive')
            .where('studentArchive.academicYearId= :academicYearId', { academicYearId: academicYearId })
            .leftJoinAndSelect('studentArchive.section','section')
            .leftJoinAndSelect('section.schoolClass','schoolClass')
            .getMany()

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

        // const newStudent = await this.studentRepository.manager.findOne(Student, {
        //     where: { enrollmentId: student.enrollmentId },
        //     relations: ["subject", "section", "section.schoolClass"]
        // })

        const newStudent = await this.studentRepository.manager
        .createQueryBuilder()
        .select('student')
        .from(Student, 'student')
        .where('student.enrollmentId = :enrollmentId',{ enrollmentId: student.enrollmentId })
        .leftJoinAndSelect('student.section','section')
        .leftJoinAndSelect('section.schoolClass','schoolClass')
        .getOne()

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