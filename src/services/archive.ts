import { Repository, getManager } from "typeorm";
import { Student } from "../entities/student";
import { Student_Archive } from "../entities/student_archive"
import { Section } from '../entities/section'
import { Section_Archive } from '../entities/section_archive'
import { AcademicYear } from '../entities/academicYear'

export class ArchiveServices {

    studentRepository: Repository<Student>
    studentArchiveRepository: Repository<Student_Archive>
    sectionRepository: Repository<Section>
    sectionArchiveRepository: Repository<Section_Archive>
    academicYearRepository: Repository<AcademicYear>

    constructor() {
        this.studentRepository = getManager().getRepository(Student)
        this.studentArchiveRepository = getManager().getRepository(Student_Archive)
        this.sectionRepository = getManager().getRepository(Section)
        this.sectionArchiveRepository = getManager().getRepository(Section_Archive)
        this.academicYearRepository = getManager().getRepository(AcademicYear);
    }

    public async moveStudent(academicYearId: number){

        const archiveStudents = await this.studentRepository.find({relations: ['section']})

        if(archiveStudents.length<=0){
            throw new Error("No Student Found");
        }else{
            console.log(archiveStudents)
            const academicYear = await this.academicYearRepository.findOne({
                where: {
                    id: academicYearId
                }
            })

            if(!academicYear){
                throw new Error("No academic Year found with this ID");
            }else{
                let students = await this.studentArchiveRepository.save(archiveStudents)
                students.forEach((student, index)=>{
                    students[index].academicYear = academicYear
                    //student.academicYear = academicYear
                })
                this.studentArchiveRepository.save(students)
            }

        }

    }

    public async moveSection(){

        const archiveSections = await this.sectionRepository.find()

        if(archiveSections.length<=0){
            throw new Error("No sections found");
        }else{
            this.sectionArchiveRepository.save(archiveSections)
        }

    }

    public async archive(academicYearId){

        await this.moveSection()
        this.moveStudent(academicYearId)

    }

    public async getStudent(studentId: number){

        const archiveStudent = await this.studentArchiveRepository.findOne({
            where: {
                id: studentId
            },relations: ['section']
        })

        if(!archiveStudent){
            throw new Error("No student found");
        }else{
            return archiveStudent;
        }

    }
}