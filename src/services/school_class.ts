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
            section:cls.section
        })

        return this.classRepository.save(newClass)
    }

    public async getSingleClass(clsId:number){

        const cls = await this.classRepository.findOne({
            where: {
                id: clsId
            }
        })
        if(!cls){
            throw new Error("No Class Found");
        }else{
            return cls
        }

    }

    public async getAllClasses(){

        const classes = await this.classRepository.find()

        if(classes.length<=0){
            throw new Error("There are no classes")
        }else{
            return classes
        }

    }

    public async updateClass(cls: Partial<SchoolClass>){

        const updateClass = await this.classRepository.findOne({
            where: {
                id:cls.id
            }
        })
        if(!updateClass){
            throw new Error("No class found");
        }else{
            updateClass.className = cls.className
            updateClass.section = cls.section
            return this.classRepository.save(updateClass)
        }

    }

    public async deleteClass(clsId: number){

        const deleteClass = await this.classRepository.findOne({
            where: {
                id: clsId
            }
        })

        if(!deleteClass){
            throw new Error("No Class Found may be deleted already");
        }else{
            return this.classRepository.delete(deleteClass)
        }
        
    }
}