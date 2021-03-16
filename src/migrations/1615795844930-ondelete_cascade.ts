import {MigrationInterface, QueryRunner} from "typeorm";

export class ondeleteCascade1615795844930 implements MigrationInterface {
    name = 'ondeleteCascade1615795844930'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Subject" DROP CONSTRAINT "FK_f1245be8e5b60c0bf6ec48b72bf"`);
        await queryRunner.query(`ALTER TABLE "Subject" ADD CONSTRAINT "FK_f1245be8e5b60c0bf6ec48b72bf" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Subject" DROP CONSTRAINT "FK_f1245be8e5b60c0bf6ec48b72bf"`);
        await queryRunner.query(`ALTER TABLE "Subject" ADD CONSTRAINT "FK_f1245be8e5b60c0bf6ec48b72bf" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

}
