import { getManager, Repository } from 'typeorm'
import { Teacher } from '../entities/teacher'

export class TeacherService {

    teacherrepository: Repository<Teacher>

    constructor() {
        this.teacherrepository = getManager().getRepository(Teacher)
    }

    public async create(teacher: Partial<Teacher>) {

        const newTeacher = await this.teacherrepository.create({
            id: teacher.id,
            name: teacher.name,
            gender: teacher.gender,
            subject: teacher.subject
        })

        return this.teacherrepository.save(newTeacher)
    }

    public async getTeacher(teacherId: number) {

        const teacher = await this.teacherrepository.findOne({
            where: {
                id: teacherId
            },
            relations: ['subject']

        })

        return teacher;
    }

    public async getAllTeachers() {

        const teachers = await this.teacherrepository.find({ relations: ['subject'] })

        return teachers
    }

    public async updateTeacher(teacher: Partial<Teacher>) {

        const updateTeacher = await this.teacherrepository.findOne({
            where: {
                id: teacher.id
            }
        })

        updateTeacher.name = teacher.name;
        updateTeacher.gender = teacher.gender;
        updateTeacher.subject = teacher.subject;

        return this.teacherrepository.save(updateTeacher);
    }

    public async deleteTeacher(teacherId: number) {

        const deleteTeacher = await this.teacherrepository.findOne({
            where: {
                id: teacherId
            }
        })

        if (!deleteTeacher) {
            throw new Error("There is no Teacher with this ID");
        } else {
            return this.teacherrepository.delete(deleteTeacher)
        }
    }
}