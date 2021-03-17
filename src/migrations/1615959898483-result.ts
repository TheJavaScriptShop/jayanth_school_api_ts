import {MigrationInterface, QueryRunner} from "typeorm";

export class result1615959898483 implements MigrationInterface {
    name = 'result1615959898483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "result" DROP CONSTRAINT "FK_15d91965444a69aea2b8017a488"`);
        await queryRunner.query(`ALTER TABLE "Student" ALTER COLUMN "name" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Student"."name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Student" ALTER COLUMN "gender" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Student"."gender" IS NULL`);
        await queryRunner.query(`ALTER TABLE "result" ADD CONSTRAINT "FK_15d91965444a69aea2b8017a488" FOREIGN KEY ("examId") REFERENCES "examinations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "result" DROP CONSTRAINT "FK_15d91965444a69aea2b8017a488"`);
        await queryRunner.query(`COMMENT ON COLUMN "Student"."gender" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Student" ALTER COLUMN "gender" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Student"."name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Student" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "result" ADD CONSTRAINT "FK_15d91965444a69aea2b8017a488" FOREIGN KEY ("examId") REFERENCES "examinations"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

}
