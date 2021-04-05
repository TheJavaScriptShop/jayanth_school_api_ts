import { Repository, getManager } from 'typeorm'
import { SchoolClass } from '../entities/school_class'
import { Section } from '../entities/section'
import { SectionArchive } from "../entities/section_archive"

export class SectionService {

    classRepository: Repository<SchoolClass>
    sectionRepository: Repository<Section>
    sectionArchiveRepository: Repository<SectionArchive>

    constructor() {
        this.classRepository = getManager().getRepository(SchoolClass)
        this.sectionRepository = getManager().getRepository(Section)
        this.sectionArchiveRepository = getManager().getRepository(SectionArchive)
    }

    public async createSection(section: Partial<Section>, classId: number) {

        const newClass = await this.classRepository.findOne({
            where: {
                id: classId
            }
        })

        if (!newClass) {
            throw new Error("No Class was found with this ID");
        } else {
            const newSection = await this.sectionRepository.create({
                id: section.id,
                name: section.name,
                schoolClass: newClass
            })

            return this.sectionRepository.save(newSection)
        }
    }

    public async getOneSection(secId: number) {

        const sec = await this.sectionRepository.findOne({
            where: {
                id: secId
            }, relations: ['schoolClass', 'student']
        })
        if (!sec) {
            throw new Error("No section not found");
        } else {
            return sec
        }

    }

    public async getSections(academicYearId: number) {


        if (academicYearId === undefined) {

            const sections = await this.sectionRepository.find({ relations: ['schoolClass', 'student'] })

            if (sections.length <= 0) {
                throw new Error("No sections found");
            } else {
                return sections
            }
        } else {
            const pastSections = await this.sectionArchiveRepository.find({
                where: {
                    academicYear: academicYearId
                }
            })

            if (pastSections.length <= 0) {
                throw new Error("There are no sections in this year");
            } else {
                return pastSections
            }
        }

    }

    public async updateSection(section: Partial<Section>, clsId: number) {

        const updateSection = await this.sectionRepository.findOne({
            where: {
                id: section.id
            }
        })

        if (!updateSection) {
            throw new Error("No Section Found");
        } else {
            const cls = await this.classRepository.findOne({
                where: {
                    id: clsId
                }
            })
            if (!cls) {
                throw new Error("No class Found with this ID");
            } else {
                updateSection.name = section.name
                updateSection.id = section.id
                updateSection.schoolClass = cls

                return this.sectionRepository.save(updateSection)
            }
        }

    }

    public async deleteSection(sectionId: number) {

        const deletedSection = await this.sectionRepository.findOne({
            where: {
                id: sectionId
            }
        })
        if (!deletedSection) {
            throw new Error("No section found")
        } else {
            return this.sectionRepository.delete(deletedSection.id)
        }

    }
}