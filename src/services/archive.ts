import { Repository, getManager } from "typeorm";
import { Student } from "../entities/student";
import { StudentArchive } from "../entities/student_archive"
import { Section } from '../entities/section'
import { SectionArchive } from '../entities/section_archive'
import { SchoolClassArchive } from "../entities/school_class_archive"
import { SchoolClass } from "../entities/school_class"
import { Examinations } from "../entities/examinations"
import { ExaminationsArchive } from "../entities/examination_archive"
import { Teacher } from "../entities/teacher"
import { TeacherArchive } from "../entities/teacher_archive"
import { Subject } from "../entities/subject"
import { SubjectArchive } from "../entities/subject_archive"
import { Result } from "../entities/result"
import { ResultArchive } from "../entities/result_archive"
import { AcademicYear } from '../entities/academicYear'

export class ArchiveServices {

    studentRepository: Repository<Student>
    studentArchiveRepository: Repository<StudentArchive>
    sectionRepository: Repository<Section>
    sectionArchiveRepository: Repository<SectionArchive>
    academicYearRepository: Repository<AcademicYear>
    examinationsRepository: Repository<Examinations>
    schoolClassRepository: Repository<SchoolClass>
    teacherRepository: Repository<Teacher>
    subjectRepository: Repository<Subject>
    resultRepository: Repository<Result>
    schoolClassArchiveRepository: Repository<SchoolClassArchive>
    examinationArchiveRepository: Repository<ExaminationsArchive>
    teacherArchiveRepository: Repository<TeacherArchive>
    subjectArchiveRepository: Repository<SubjectArchive>
    resultArchiveRepository: Repository<ResultArchive>


    constructor() {
        this.studentRepository = getManager().getRepository(Student)
        this.studentArchiveRepository = getManager().getRepository(StudentArchive)
        this.sectionRepository = getManager().getRepository(Section)
        this.sectionArchiveRepository = getManager().getRepository(SectionArchive)
        this.academicYearRepository = getManager().getRepository(AcademicYear)
        this.examinationsRepository = getManager().getRepository(Examinations)
        this.schoolClassRepository = getManager().getRepository(SchoolClass)
        this.teacherRepository = getManager().getRepository(Teacher)
        this.subjectRepository = getManager().getRepository(Subject)
        this.resultRepository = getManager().getRepository(Result)
        this.schoolClassArchiveRepository = getManager().getRepository(SchoolClassArchive)
        this.examinationArchiveRepository = getManager().getRepository(ExaminationsArchive)
        this.teacherArchiveRepository = getManager().getRepository(TeacherArchive)
        this.subjectArchiveRepository = getManager().getRepository(SubjectArchive)
        this.resultArchiveRepository = getManager().getRepository(ResultArchive)
    }

    public async moveStudent(academicYearId: number) {

        const archiveStudents = await this.studentRepository.find({ relations: ['section'] })

        if (archiveStudents.length <= 0) {
            throw new Error("No Student Found");
        } else {
            //console.log(archiveStudents)
            const academicYear = await this.academicYear(academicYearId)

            let students = await this.studentArchiveRepository.save(archiveStudents)
            students.forEach((student, index) => {
                students[index].academicYear = academicYear
                //student.academicYear = academicYear
            })
            this.studentArchiveRepository.save(students)

        }

    }

    public async moveSection(academicYearId: number) {

        const archiveSections = await this.sectionRepository.find({ relations: ['schoolClass'] })

        if (archiveSections.length <= 0) {
            throw new Error("No sections found");
        } else {
            const academicYear = await this.academicYear(academicYearId)

            let sections = await this.sectionArchiveRepository.save(archiveSections)
            sections.forEach((section, index) => {
                sections[index].academicYear = academicYear
            })

            this.sectionArchiveRepository.save(sections)
        }

    }

    public async moveClass(academicYearId: number) {

        const archiveClasses = await this.schoolClassRepository.find()

        if (archiveClasses.length <= 0) {
            throw new Error("No classes found");
        } else {
            const academicYear = await this.academicYear(academicYearId)

            let classes = await this.schoolClassArchiveRepository.save(archiveClasses)
            classes.forEach((newClass, index) => {
                classes[index].academicYear = academicYear
            })

            this.schoolClassArchiveRepository.save(classes)
        }

    }

    public async moveTeacher(academicYearId: number) {

        const archiveTeachers = await this.teacherRepository.find()

        if (archiveTeachers.length <= 0) {
            throw new Error("No teacher Found");
        } else {
            const academicYear = await this.academicYear(academicYearId)

            let teachers = await this.teacherArchiveRepository.save(archiveTeachers)

            teachers.forEach((teacher, index) => {
                teachers[index].academicYear = academicYear
            })

            this.teacherArchiveRepository.save(teachers)
        }

    }

    public async moveSubject(academicYearId: number) {

        const archiveSubjects = await this.subjectRepository.find({ relations: ['teacher'] })

        if (archiveSubjects.length <= 0) {
            throw new Error("No Subjects Found");
        } else {
            const academicYear = await this.academicYear(academicYearId)

            let subjects = await this.subjectArchiveRepository.save(archiveSubjects)

            subjects.forEach((subject, index) => {
                subjects[index].academicYear = academicYear
            })

            this.subjectArchiveRepository.save(subjects)
        }
    }

    public async moveExaminations(academicYearId: number) {

        const archiveExams = await this.examinationsRepository.find({ relations: ['teacher'] })

        if (archiveExams.length <= 0) {
            throw new Error("No Exams Found");
        } else {
            const academicYear = await this.academicYear(academicYearId)

            let exams = await this.examinationArchiveRepository.save(archiveExams)

            exams.forEach((exam, index) => {
                exams[index].academicYear = academicYear
            })

            this.examinationArchiveRepository.save(exams)
        }
    }

    public async moveResults(academicYearId: number) {

        const archiveResults = await this.resultRepository.find({ relations: ['exam', 'student'] })

        if (archiveResults.length <= 0) {
            throw new Error("No results found");
        } else {
            const academicYear = await this.academicYear(academicYearId)

            let results = await this.resultArchiveRepository.save(archiveResults)

            results.forEach((result, index) => {
                results[index].academicYear = academicYear
            })

            this.resultArchiveRepository.save(results)
        }

    }

    public async archive(academicYearId) {

        await this.moveClass(academicYearId)
        await this.moveSection(academicYearId)
        await this.moveStudent(academicYearId)
        await this.moveTeacher(academicYearId)
        await this.moveSubject(academicYearId)
        await this.moveExaminations(academicYearId)
        await this.moveResults(academicYearId)

    }

    public async academicYear(academicYearId: number) {

        const academicYear = await this.academicYearRepository.findOne({
            where: {
                id: academicYearId
            }
        })

        if (!academicYear) {
            throw new Error("No academic Year found with this ID");
        } else {
            return academicYear
        }
    }



    public async getStudent(studentId: number) {

        const archiveStudent = await this.studentArchiveRepository.findOne({
            where: {
                id: studentId
            }, relations: ['section']
        })

        if (!archiveStudent) {
            throw new Error("No student found");
        } else {
            return archiveStudent;
        }

    }
}