import {MigrationInterface, QueryRunner} from "typeorm";

export class teacher1615367946720 implements MigrationInterface {
    name = 'teacher1615367946720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Teacher" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "gender" character varying NOT NULL, "subject" character varying NOT NULL, CONSTRAINT "PK_c089345af0160b3fd7b44f59e61" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Teacher"`);
    }

}
