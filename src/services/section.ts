import { Repository, getManager } from 'typeorm'
import { SchoolClass } from '../entities/school_class'
import { Section } from '../entities/section'

export class SectionService {

    classRepository: Repository<SchoolClass>
    sectionRepository: Repository<Section>

    constructor() {
        this.classRepository = getManager().getRepository(SchoolClass)
        this.sectionRepository = getManager().getRepository(Section)
    }

    public async createSection(sec: Partial<Section>, clsId: number) {

        const cls = await this.classRepository.findOne({
            where: {
                id: clsId
            }
        })

        if (!cls) {
            throw new Error("No Class was found with this ID");
        } else {
            const newSection = await this.sectionRepository.create({
                id: sec.id,
                name: sec.name,
                schoolClass: cls
            })

            return this.sectionRepository.save(newSection)
        }
    }

    public async getOneSection(secId: number) {

        const sec = await this.sectionRepository.findOne({
            where: {
                id: secId
            }, relations: ['schoolClass','student']
        })
        if (!sec) {
            throw new Error("No section not found");
        } else {
            return sec
        }

    }

    public async getSections() {

        const sections = await this.sectionRepository.find({ relations: ['schoolClass','student'] })

        if (sections.length <= 0) {
            throw new Error("No sections was found may be deleted");
        } else {
            return sections
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

    public async deleteSection(secId: number) {

        const deletedSection = await this.sectionRepository.findOne({
            where: {
                id: secId
            }
        })
        if (!deletedSection) {
            throw new Error("No section found")
        } else {
            return this.sectionRepository.delete(deletedSection)
        }

    }
}