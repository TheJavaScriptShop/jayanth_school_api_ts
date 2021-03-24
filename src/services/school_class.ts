import { Repository, getManager } from 'typeorm'
import { SchoolClass } from '../entities/school_class'
import { Section } from '../entities/section'

export class ClassService {

    classRepository: Repository<SchoolClass>
    sectionRepository: Repository<Section>

    constructor() {
        this.classRepository = getManager().getRepository(SchoolClass)
        this.sectionRepository = getManager().getRepository(Section)
    }

    public async createClass(cls: Partial<SchoolClass>) {

        const newClass = await this.classRepository.create({
            id: cls.id,
            className: cls.className,
            section: cls.section
        })

        return this.classRepository.save(newClass)
    }

    public async getSingleClass(classId: number) {

        const newClass = await this.classRepository.findOne({
            where: {
                id: classId
            }
        })
        if (!newClass) {
            throw new Error("No Class Found");
        } else {
            return newClass
        }

    }

    public async getAllClasses() {

        const classes = await this.classRepository.find()

        if (classes.length <= 0) {
            throw new Error("There are no classes")
        } else {
            return classes
        }

    }

    public async updateClass(schoolClass: Partial<SchoolClass>) {

        const updateClass = await this.classRepository.findOne({
            where: {
                id: schoolClass.id
            }
        })
        if (!updateClass) {
            throw new Error("No class found");
        } else {
            updateClass.className = schoolClass.className
            updateClass.section = schoolClass.section
            return this.classRepository.save(updateClass)
        }

    }

    public async deleteClass(classId: number) {

        const deleteClass = await this.classRepository.findOne({
            where: {
                id: classId
            }
        })

        if (!deleteClass) {
            throw new Error("No Class Found may be deleted already");
        } else {
            return this.classRepository.delete(deleteClass)
        }

    }
}