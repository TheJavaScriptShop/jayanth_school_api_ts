import {MigrationInterface, QueryRunner} from "typeorm";

export class studentSection1616498123810 implements MigrationInterface {
    name = 'studentSection1616498123810'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Student" ADD "sectionId" integer`);
        await queryRunner.query(`COMMENT ON COLUMN "Student"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Student"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Student" ADD CONSTRAINT "FK_dfbaf12743886974cc43d2b8111" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Student" DROP CONSTRAINT "FK_dfbaf12743886974cc43d2b8111"`);
        await queryRunner.query(`COMMENT ON COLUMN "Student"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Student"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Student" DROP COLUMN "sectionId"`);
    }

}
