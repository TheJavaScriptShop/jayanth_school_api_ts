import {MigrationInterface, QueryRunner} from "typeorm";

export class studentSubject1615276781145 implements MigrationInterface {
    name = 'studentSubject1615276781145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "student_subject" ("studentId" integer NOT NULL, "subjectId" integer NOT NULL, CONSTRAINT "PK_ec05f70ce293ac1dcb21d4f04ae" PRIMARY KEY ("studentId", "subjectId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6c0174e4b12826cd561cebd4ba" ON "student_subject" ("studentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1fba30b9160e94e2a6e1f2ea2c" ON "student_subject" ("subjectId") `);
        await queryRunner.query(`ALTER TABLE "student_subject" ADD CONSTRAINT "FK_6c0174e4b12826cd561cebd4ba2" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_subject" ADD CONSTRAINT "FK_1fba30b9160e94e2a6e1f2ea2ce" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_subject" DROP CONSTRAINT "FK_1fba30b9160e94e2a6e1f2ea2ce"`);
        await queryRunner.query(`ALTER TABLE "student_subject" DROP CONSTRAINT "FK_6c0174e4b12826cd561cebd4ba2"`);
        await queryRunner.query(`DROP INDEX "IDX_1fba30b9160e94e2a6e1f2ea2c"`);
        await queryRunner.query(`DROP INDEX "IDX_6c0174e4b12826cd561cebd4ba"`);
        await queryRunner.query(`DROP TABLE "student_subject"`);
    }

}
