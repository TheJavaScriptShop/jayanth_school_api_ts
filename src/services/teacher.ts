import { getManager, Repository } from 'typeorm'
import { Teacher } from '../entities/teacher'
import { TeacherArchive } from "../entities/teacher_archive"
import csvParser from 'csv-parser'
import * as fs from 'fs'

export class TeacherService {

    teacherRepository: Repository<Teacher>
    teacherArchiveRepository: Repository<TeacherArchive>

    constructor() {
        this.teacherRepository = getManager().getRepository(Teacher)
        this.teacherArchiveRepository = getManager().getRepository(TeacherArchive)
    }

    public async create(teacher: Partial<Teacher>) {

        // const newTeacher = await this.teacherRepository.create({
        //     id: teacher.id,
        //     name: teacher.name,
        //     gender: teacher.gender,
        // })

        const newTeacher = await this.teacherRepository.query('insert into public."Teacher"(name, gender) values($1, $2) returning *', [teacher.name, teacher.gender])
        
        return newTeacher

        // return this.teacherRepository.save(newTeacher)
        // return this.teacherRepository.query('select * from public."Teacher" where id = $1', [ newTeacher.id ]);
    }

    public async getTeacher(teacherId: number) {

        // const teacher = await this.teacherRepository.findOne({
        //     where: {
        //         id: teacherId
        //     },
        //     relations: ['subject']

        // })

        const teacher = await this.teacherRepository.query('select Teacher.id, Teacher.name, Teacher.gender, subject from public."Teacher" as Teacher left join public."Subject" as Subject on Teacher."id" = Subject."teacherId" where Teacher.id=$1', [teacherId])
        // console.log(teacher)
        return teacher;
    }

    public async getAllTeachers(academicYearId: number) {

        if (academicYearId === undefined) {

            // const teachers = await this.teacherRepository.find({ relations: ['subject'] });

            const teachers = await this.teacherRepository.query('select Teacher.id, Teacher.name, Teacher.gender, subject from public."Teacher" as Teacher left join public."Subject" as Subject on Teacher."id" = Subject."teacherId"')

            if (teachers.length <= 0) {
                throw new Error("There are no teachers");
            } else {
                return teachers;
            }

        } else {

            // const pastTeachers = await this.teacherArchiveRepository.find({
            //     where: {
            //         academicYear: academicYearId
            //     }, relations: ['subject']
            // })

            const pastTeachers = await this.teacherArchiveRepository.query('select Teacher_Archive.id, Teacher_Archive.name, Teacher_Archive.gender, subject_archive from public."Teacher_Archive" as Teacher_Archive left join public."Subject_Archive" as Subject_Archive on Teacher_Archive."id" = Subject_Archive."teacherId"')

            if (pastTeachers.length <= 0) {
                throw new Error("There are no teachers in this Year");
            } else {
                return pastTeachers;
            }
        }
    }

    public async updateTeacher(teacher: Partial<Teacher>) {

        // const updateTeacher = await this.teacherRepository.findOne({
        //     where: {
        //         id: teacher.id
        //     }
        // })

        // console.log(teacher)

        const updateTeacher = await this.teacherRepository.query('update public."Teacher" set name = $1 , gender = $2 where public."Teacher".id= $3 returning *', [teacher.name, teacher.gender, teacher.id])
        
        return updateTeacher

        // console.log(updateTeacher)

        // updateTeacher.name = teacher.name;
        // updateTeacher.gender = teacher.gender;

        // return this.teacherRepository.save(updateTeacher);
    }

    public async deleteTeacher(teacherId: number) {

        // const deleteTeacher = await this.teacherRepository.findOne({
        //     where: {
        //         id: teacherId
        //     }
        // })

        const deleteTeacher = await this.teacherRepository.query(`SELECT id FROM public."Teacher" where id = $1`, [teacherId])
        // console.log(deleteTeacher)

        if (!deleteTeacher) {
            throw new Error("There is no Teacher with this ID");
        } else {
            return this.teacherRepository.query('delete from public."Teacher" where id = $1', [teacherId])
        }
    }

    public async uploadTeachers(filename: string) {
        const teachers = [];

        console.log(filename)
        fs.createReadStream(`./src/uploads/${filename}`)
            .pipe(csvParser({}))
            .on('data', (data) => teachers.push(data))
            .on('end', () => {
                this.teacherRepository.save(teachers)
                console.log('done')
            })
    }
}