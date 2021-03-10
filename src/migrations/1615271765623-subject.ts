import {MigrationInterface, QueryRunner} from "typeorm";

export class subject1615271765623 implements MigrationInterface {
    name = 'subject1615271765623'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Subject" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_ea85b796e06e827fbb699842d58" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Student" DROP COLUMN "subject"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Student" ADD "subject" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "Subject"`);
    }

}
