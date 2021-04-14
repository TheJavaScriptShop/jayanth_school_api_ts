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

        const newTeacher = await this.teacherRepository.create({
            id: teacher.id,
            name: teacher.name,
            gender: teacher.gender,
        })

        return this.teacherRepository.save(newTeacher)
    }

    public async getTeacher(teacherId: number) {

        const teacher = await this.teacherRepository.findOne({
            where: {
                id: teacherId
            },
            relations: ['subject']

        })

        return teacher;
    }

    public async getAllTeachers(academicYearId: number) {

        if (academicYearId === undefined) {

            const teachers = await this.teacherRepository.find({ relations: ['subject'] });


            if (teachers.length <= 0) {
                throw new Error("There are no teachers");
            } else {
                return teachers;
            }

        } else {

            const pastTeachers = await this.teacherArchiveRepository.find({
                where: {
                    academicYear: academicYearId
                }, relations: ['subject']
            })

            if (pastTeachers.length <= 0) {
                throw new Error("There are no teachers in this Year");
            } else {
                return pastTeachers;
            }
        }
    }

    public async updateTeacher(teacher: Partial<Teacher>) {

        const updateTeacher = await this.teacherRepository.findOne({
            where: {
                id: teacher.id
            }
        })

        updateTeacher.name = teacher.name;
        updateTeacher.gender = teacher.gender;

        return this.teacherRepository.save(updateTeacher);
    }

    public async deleteTeacher(teacherId: number) {

        const deleteTeacher = await this.teacherRepository.findOne({
            where: {
                id: teacherId
            }
        })

        if (!deleteTeacher) {
            throw new Error("There is no Teacher with this ID");
        } else {
            return this.teacherRepository.delete(deleteTeacher.id)
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