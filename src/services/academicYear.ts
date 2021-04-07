import { Repository, getManager } from "typeorm";
import { AcademicYear } from "../entities/academicYear";

export class AcademicYearService {

    academicYearRepository: Repository<AcademicYear>

    constructor() {
        this.academicYearRepository = getManager().getRepository(AcademicYear)
    }

    public async createYear(label: string) {

        const newYear = await this.academicYearRepository.create({
            label: label
        })

        return this.academicYearRepository.save(newYear)

    }
}