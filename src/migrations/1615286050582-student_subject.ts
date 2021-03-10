import {MigrationInterface, QueryRunner} from "typeorm";

export class studentSubject1615286050582 implements MigrationInterface {
    name = 'studentSubject1615286050582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subject_student__student" ("subjectId" integer NOT NULL, "studentId" integer NOT NULL, CONSTRAINT "PK_09ab959b751551f7abe3af79d02" PRIMARY KEY ("subjectId", "studentId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4fa1f184926701a66e46b2ca99" ON "subject_student__student" ("subjectId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9f6d5c51ae819db0d09668bfba" ON "subject_student__student" ("studentId") `);
        await queryRunner.query(`ALTER TABLE "subject_student__student" ADD CONSTRAINT "FK_4fa1f184926701a66e46b2ca99f" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject_student__student" ADD CONSTRAINT "FK_9f6d5c51ae819db0d09668bfba0" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject_student__student" DROP CONSTRAINT "FK_9f6d5c51ae819db0d09668bfba0"`);
        await queryRunner.query(`ALTER TABLE "subject_student__student" DROP CONSTRAINT "FK_4fa1f184926701a66e46b2ca99f"`);
        await queryRunner.query(`DROP INDEX "IDX_9f6d5c51ae819db0d09668bfba"`);
        await queryRunner.query(`DROP INDEX "IDX_4fa1f184926701a66e46b2ca99"`);
        await queryRunner.query(`DROP TABLE "subject_student__student"`);
    }

}
