import {MigrationInterface, QueryRunner} from "typeorm";

export class timestampDefault1616410659655 implements MigrationInterface {
    name = 'timestampDefault1616410659655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "Student"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Student" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`COMMENT ON COLUMN "Student"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Student" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Student" ALTER COLUMN "updatedAt" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "Student"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Student" ALTER COLUMN "createdAt" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "Student"."createdAt" IS NULL`);
    }

}
