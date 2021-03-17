import {MigrationInterface, QueryRunner} from "typeorm";

export class resultCascade1615975112942 implements MigrationInterface {
    name = 'resultCascade1615975112942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "result" DROP CONSTRAINT "FK_4782e86a1f84152f65b2fdabf69"`);
        await queryRunner.query(`ALTER TABLE "result" DROP CONSTRAINT "FK_15d91965444a69aea2b8017a488"`);
        await queryRunner.query(`ALTER TABLE "examinations" DROP CONSTRAINT "FK_c880ffe815a72d462ab09bc6f04"`);
        await queryRunner.query(`ALTER TABLE "examinations" ALTER COLUMN "max_time" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "examinations"."max_time" IS NULL`);
        await queryRunner.query(`ALTER TABLE "examinations" ALTER COLUMN "teacherId" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "examinations"."teacherId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "result" ADD CONSTRAINT "FK_4782e86a1f84152f65b2fdabf69" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "result" ADD CONSTRAINT "FK_15d91965444a69aea2b8017a488" FOREIGN KEY ("examId") REFERENCES "examinations"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "examinations" ADD CONSTRAINT "FK_c880ffe815a72d462ab09bc6f04" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "examinations" DROP CONSTRAINT "FK_c880ffe815a72d462ab09bc6f04"`);
        await queryRunner.query(`ALTER TABLE "result" DROP CONSTRAINT "FK_15d91965444a69aea2b8017a488"`);
        await queryRunner.query(`ALTER TABLE "result" DROP CONSTRAINT "FK_4782e86a1f84152f65b2fdabf69"`);
        await queryRunner.query(`COMMENT ON COLUMN "examinations"."teacherId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "examinations" ALTER COLUMN "teacherId" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "examinations"."max_time" IS NULL`);
        await queryRunner.query(`ALTER TABLE "examinations" ALTER COLUMN "max_time" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "examinations" ADD CONSTRAINT "FK_c880ffe815a72d462ab09bc6f04" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "result" ADD CONSTRAINT "FK_15d91965444a69aea2b8017a488" FOREIGN KEY ("examId") REFERENCES "examinations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "result" ADD CONSTRAINT "FK_4782e86a1f84152f65b2fdabf69" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
