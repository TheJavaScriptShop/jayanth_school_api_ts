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

        const newTeacher = await this.teacherRepository.query('insert into public."Teacher"(name, gender) values($1, $2) returning *', [teacher.name, teacher.gender])

        return newTeacher

    }

    public async getTeacher(teacherId: number) {

        const teacher = await this.teacherRepository.query('select Teacher.id, Teacher.name, Teacher.gender, subject from public."Teacher" as Teacher left join public."Subject" as Subject on Teacher."id" = Subject."teacherId" where Teacher.id=$1', [teacherId])

        return teacher;
    }

    public async getAllTeachers(academicYearId: number) {

        if (academicYearId === undefined) {

            const teachers = await this.teacherRepository.query('SELECT  "Teacher"."id" AS "Teacher_id", "Teacher"."name" AS "Teacher_name", "Teacher"."gender" AS "Teacher_gender", "Teacher__subject"."id" AS "Teacher__subject_id", "Teacher__subject"."name" AS "Teacher__subject_name" FROM "Teacher" "Teacher" LEFT JOIN "Subject" "Teacher__subject" ON "Teacher__subject"."teacherId"="Teacher"."id"')

            const changedTeachers = teachers.map(teacher => ({
                id: teacher.Teacher_id,
                name: teacher.Teacher_name,
                gender: teacher.Teacher_gender,
                subject: {
                    name: teacher.Teacher__subject_name,
                    id: teacher.Teacher__subject_id
                }
            }))

            if (teachers.length <= 0) {
                throw new Error("There are no teachers");
            } else {
                return changedTeachers;
            }

        } else {
            const pastTeachers = await this.teacherArchiveRepository.query('SELECT  "Teacher_Archive"."id" AS "Teacher_Archive_id", "Teacher_Archive"."name" AS "Teacher_Archive_name", "Teacher_Archive"."gender" AS "Teacher_Archive_gender", "Teacher_Archive__subject"."id" AS "Teacher_Archive__subject_id", "Teacher_Archive__subject"."name" AS "Teacher_Archive__subject_name" FROM "Teacher_Archive" "Teacher_Archive" LEFT JOIN "Subject_Archive" "Teacher_Archive__subject" ON "Teacher_Archive__subject"."teacherId"="Teacher_Archive"."id"')

            const changedTeachers = pastTeachers.map(teacher => ({
                id: teacher.Teacher_Archive_id,
                name: teacher.Teacher_Archive_name,
                gender: teacher.Teacher_Archive_gender,
                subject: {
                    name: teacher.Teacher_Archive__subject_name,
                    id: teacher.Teacher_Archive__subject_id
                }
            }))

            if (pastTeachers.length <= 0) {
                throw new Error("There are no teachers in this Year");
            } else {
                return changedTeachers;
            }
        }
    }

    public async updateTeacher(teacher: Partial<Teacher>) {

        const updateTeacher = await this.teacherRepository.query('update public."Teacher" set name = $1 , gender = $2 where public."Teacher".id= $3 returning *', [teacher.name, teacher.gender, teacher.id])

        return updateTeacher
    }

    public async deleteTeacher(teacherId: number) {

        const deleteTeacher = await this.teacherRepository.query(`SELECT id FROM public."Teacher" where id = $1`, [teacherId])

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