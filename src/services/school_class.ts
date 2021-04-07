import { Repository, getManager } from 'typeorm'
import { SchoolClass } from '../entities/school_class'
import { Section } from '../entities/section'
import { SchoolClassArchive } from '../entities/school_class_archive'

export class ClassService {

    classRepository: Repository<SchoolClass>
    sectionRepository: Repository<Section>
    classArchiveRepository: Repository<SchoolClassArchive>

    constructor() {
        this.classRepository = getManager().getRepository(SchoolClass)
        this.sectionRepository = getManager().getRepository(Section)
        this.classArchiveRepository = getManager().getRepository(SchoolClassArchive)
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

    public async getAllClasses(academicYearId: number) {

        if (academicYearId === undefined) {
            const classes = await this.classRepository.find()

            if (classes.length <= 0) {
                throw new Error("No classes found");
            } else {
                return classes
            }
        } else {
            const pastClasses = await this.classArchiveRepository.find({
                where: {
                    academicYear: academicYearId
                }
            })

            if (pastClasses.length <= 0) {
                throw new Error("There are no classes in this year");
            } else {
                return pastClasses
            }
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
            return this.classRepository.delete(deleteClass.id)
        }

    }
}