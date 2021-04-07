import {MigrationInterface, QueryRunner} from "typeorm";

export class acedemicYear1616752915494 implements MigrationInterface {
    name = 'acedemicYear1616752915494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "AcademicYear" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "id" SERIAL NOT NULL, "label" character varying NOT NULL, CONSTRAINT "PK_1775663927111f2ca911efffe66" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "AcademicYear"`);
    }

}
