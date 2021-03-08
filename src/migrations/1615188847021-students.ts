import {MigrationInterface, QueryRunner} from "typeorm";

export class students1615188847021 implements MigrationInterface {
    name = 'students1615188847021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Student" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "subject" character varying NOT NULL, "gender" character varying NOT NULL, CONSTRAINT "PK_dc3573f6f2de5aa3aefca0c1f1a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Student"`);
    }

}
