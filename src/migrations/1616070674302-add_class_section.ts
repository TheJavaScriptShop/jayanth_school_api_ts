import {MigrationInterface, QueryRunner} from "typeorm";

export class addClassSection1616070674302 implements MigrationInterface {
    name = 'addClassSection1616070674302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Result" ("id" SERIAL NOT NULL, "marks" integer NOT NULL, "studentId" integer, "examId" integer, CONSTRAINT "PK_c93b145f3c2e95f6d9e21d188e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Examinations" ("id" SERIAL NOT NULL, "examName" character varying NOT NULL, "subjectName" character varying NOT NULL, "totalMarks" integer NOT NULL, "maxTime" integer, "teacherId" integer, CONSTRAINT "PK_7694851ac6eaf734b64fcf06c28" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Section" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "schoolClassId" integer, CONSTRAINT "PK_3c41d2d699384cc5e8eac54777d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "School_Class" ("id" SERIAL NOT NULL, "className" integer NOT NULL, CONSTRAINT "PK_c2db13fe0f6e127a4aae70bfd35" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Result" ADD CONSTRAINT "FK_4782e86a1f84152f65b2fdabf69" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Result" ADD CONSTRAINT "FK_15d91965444a69aea2b8017a488" FOREIGN KEY ("examId") REFERENCES "Examinations"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Examinations" ADD CONSTRAINT "FK_c880ffe815a72d462ab09bc6f04" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Section" ADD CONSTRAINT "FK_233dbe94c01389b2ac7a156bb77" FOREIGN KEY ("schoolClassId") REFERENCES "School_Class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Section" DROP CONSTRAINT "FK_233dbe94c01389b2ac7a156bb77"`);
        await queryRunner.query(`ALTER TABLE "Examinations" DROP CONSTRAINT "FK_c880ffe815a72d462ab09bc6f04"`);
        await queryRunner.query(`ALTER TABLE "Result" DROP CONSTRAINT "FK_15d91965444a69aea2b8017a488"`);
        await queryRunner.query(`ALTER TABLE "Result" DROP CONSTRAINT "FK_4782e86a1f84152f65b2fdabf69"`);
        await queryRunner.query(`DROP TABLE "School_Class"`);
        await queryRunner.query(`DROP TABLE "Section"`);
        await queryRunner.query(`DROP TABLE "Examinations"`);
        await queryRunner.query(`DROP TABLE "Result"`);
    }

}
