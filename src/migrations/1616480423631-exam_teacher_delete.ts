import {MigrationInterface, QueryRunner} from "typeorm";

export class examTeacherDelete1616480423631 implements MigrationInterface {
    name = 'examTeacherDelete1616480423631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Examinations" DROP CONSTRAINT "FK_c880ffe815a72d462ab09bc6f04"`);
        await queryRunner.query(`COMMENT ON COLUMN "Student"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Student"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Examinations" ADD CONSTRAINT "FK_c880ffe815a72d462ab09bc6f04" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Examinations" DROP CONSTRAINT "FK_c880ffe815a72d462ab09bc6f04"`);
        await queryRunner.query(`COMMENT ON COLUMN "Student"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Student"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Examinations" ADD CONSTRAINT "FK_c880ffe815a72d462ab09bc6f04" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
