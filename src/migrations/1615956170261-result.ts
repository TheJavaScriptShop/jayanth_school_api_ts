import {MigrationInterface, QueryRunner} from "typeorm";

export class result1615956170261 implements MigrationInterface {
    name = 'result1615956170261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Student" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "gender" character varying NOT NULL, "marks" integer NOT NULL, CONSTRAINT "PK_dc3573f6f2de5aa3aefca0c1f1a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Subject" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "teacherId" integer, CONSTRAINT "PK_ea85b796e06e827fbb699842d58" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Teacher" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "gender" character varying NOT NULL, CONSTRAINT "PK_c089345af0160b3fd7b44f59e61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "examinations" ("id" SERIAL NOT NULL, "exam_name" character varying NOT NULL, "subject_name" character varying NOT NULL, "total_marks" integer NOT NULL, "max_time" integer, "teacherId" integer, CONSTRAINT "PK_7694851ac6eaf734b64fcf06c28" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "result" ("id" SERIAL NOT NULL, "marks" integer NOT NULL, "studentId" integer, "examId" integer, CONSTRAINT "PK_c93b145f3c2e95f6d9e21d188e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student_subject" ("studentId" integer NOT NULL, "subjectId" integer NOT NULL, CONSTRAINT "PK_ec05f70ce293ac1dcb21d4f04ae" PRIMARY KEY ("studentId", "subjectId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6c0174e4b12826cd561cebd4ba" ON "student_subject" ("studentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1fba30b9160e94e2a6e1f2ea2c" ON "student_subject" ("subjectId") `);
        await queryRunner.query(`ALTER TABLE "Subject" ADD CONSTRAINT "FK_f1245be8e5b60c0bf6ec48b72bf" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "examinations" ADD CONSTRAINT "FK_c880ffe815a72d462ab09bc6f04" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "result" ADD CONSTRAINT "FK_4782e86a1f84152f65b2fdabf69" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "result" ADD CONSTRAINT "FK_15d91965444a69aea2b8017a488" FOREIGN KEY ("examId") REFERENCES "examinations"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "student_subject" ADD CONSTRAINT "FK_6c0174e4b12826cd561cebd4ba2" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_subject" ADD CONSTRAINT "FK_1fba30b9160e94e2a6e1f2ea2ce" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_subject" DROP CONSTRAINT "FK_1fba30b9160e94e2a6e1f2ea2ce"`);
        await queryRunner.query(`ALTER TABLE "student_subject" DROP CONSTRAINT "FK_6c0174e4b12826cd561cebd4ba2"`);
        await queryRunner.query(`ALTER TABLE "result" DROP CONSTRAINT "FK_15d91965444a69aea2b8017a488"`);
        await queryRunner.query(`ALTER TABLE "result" DROP CONSTRAINT "FK_4782e86a1f84152f65b2fdabf69"`);
        await queryRunner.query(`ALTER TABLE "examinations" DROP CONSTRAINT "FK_c880ffe815a72d462ab09bc6f04"`);
        await queryRunner.query(`ALTER TABLE "Subject" DROP CONSTRAINT "FK_f1245be8e5b60c0bf6ec48b72bf"`);
        await queryRunner.query(`DROP INDEX "IDX_1fba30b9160e94e2a6e1f2ea2c"`);
        await queryRunner.query(`DROP INDEX "IDX_6c0174e4b12826cd561cebd4ba"`);
        await queryRunner.query(`DROP TABLE "student_subject"`);
        await queryRunner.query(`DROP TABLE "result"`);
        await queryRunner.query(`DROP TABLE "examinations"`);
        await queryRunner.query(`DROP TABLE "Teacher"`);
        await queryRunner.query(`DROP TABLE "Subject"`);
        await queryRunner.query(`DROP TABLE "Student"`);
    }

}
