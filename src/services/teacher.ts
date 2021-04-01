import { getManager, Repository } from 'typeorm'
import { Teacher } from '../entities/teacher'

export class TeacherService {

    teacherRepository: Repository<Teacher>

    constructor() {
        this.teacherRepository = getManager().getRepository(Teacher)
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

    public async getAllTeachers() {

        const teachers = await this.teacherRepository.find({ relations: ['subject'] })

        return teachers
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
}