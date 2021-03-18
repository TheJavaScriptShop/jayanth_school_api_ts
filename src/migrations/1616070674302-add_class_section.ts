import {MigrationInterface, QueryRunner} from "typeorm";

export class addClassSection1616070674302 implements MigrationInterface {
    name = 'addClassSection1616070674302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "result" ("id" SERIAL NOT NULL, "marks" integer NOT NULL, "studentId" integer, "examId" integer, CONSTRAINT "PK_c93b145f3c2e95f6d9e21d188e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "examinations" ("id" SERIAL NOT NULL, "exam_name" character varying NOT NULL, "subject_name" character varying NOT NULL, "total_marks" integer NOT NULL, "max_time" integer, "teacherId" integer, CONSTRAINT "PK_7694851ac6eaf734b64fcf06c28" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "section" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "schoolClassId" integer, CONSTRAINT "PK_3c41d2d699384cc5e8eac54777d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "school_class" ("id" SERIAL NOT NULL, "className" integer NOT NULL, CONSTRAINT "PK_c2db13fe0f6e127a4aae70bfd35" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "result" ADD CONSTRAINT "FK_4782e86a1f84152f65b2fdabf69" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "result" ADD CONSTRAINT "FK_15d91965444a69aea2b8017a488" FOREIGN KEY ("examId") REFERENCES "examinations"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "examinations" ADD CONSTRAINT "FK_c880ffe815a72d462ab09bc6f04" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "section" ADD CONSTRAINT "FK_233dbe94c01389b2ac7a156bb77" FOREIGN KEY ("schoolClassId") REFERENCES "school_class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section" DROP CONSTRAINT "FK_233dbe94c01389b2ac7a156bb77"`);
        await queryRunner.query(`ALTER TABLE "examinations" DROP CONSTRAINT "FK_c880ffe815a72d462ab09bc6f04"`);
        await queryRunner.query(`ALTER TABLE "result" DROP CONSTRAINT "FK_15d91965444a69aea2b8017a488"`);
        await queryRunner.query(`ALTER TABLE "result" DROP CONSTRAINT "FK_4782e86a1f84152f65b2fdabf69"`);
        await queryRunner.query(`DROP TABLE "school_class"`);
        await queryRunner.query(`DROP TABLE "section"`);
        await queryRunner.query(`DROP TABLE "examinations"`);
        await queryRunner.query(`DROP TABLE "result"`);
    }

}
