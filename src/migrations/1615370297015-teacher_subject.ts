import {MigrationInterface, QueryRunner} from "typeorm";

export class teacherSubject1615370297015 implements MigrationInterface {
    name = 'teacherSubject1615370297015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Subject" RENAME COLUMN "teacher" TO "teacherId"`);
        await queryRunner.query(`ALTER TABLE "Teacher" DROP COLUMN "subject"`);
        await queryRunner.query(`ALTER TABLE "Subject" DROP COLUMN "teacherId"`);
        await queryRunner.query(`ALTER TABLE "Subject" ADD "teacherId" integer`);
        await queryRunner.query(`ALTER TABLE "Subject" ADD CONSTRAINT "FK_f1245be8e5b60c0bf6ec48b72bf" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Subject" DROP CONSTRAINT "FK_f1245be8e5b60c0bf6ec48b72bf"`);
        await queryRunner.query(`ALTER TABLE "Subject" DROP COLUMN "teacherId"`);
        await queryRunner.query(`ALTER TABLE "Subject" ADD "teacherId" character varying`);
        await queryRunner.query(`ALTER TABLE "Teacher" ADD "subject" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Subject" RENAME COLUMN "teacherId" TO "teacher"`);
    }

}
