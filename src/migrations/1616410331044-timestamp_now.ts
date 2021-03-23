import {MigrationInterface, QueryRunner} from "typeorm";

export class timestampNow1616410331044 implements MigrationInterface {
    name = 'timestampNow1616410331044'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Student" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Student" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Student" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "Student" DROP COLUMN "createdAt"`);
    }

}
