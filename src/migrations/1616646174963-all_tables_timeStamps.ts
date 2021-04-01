import {MigrationInterface, QueryRunner} from "typeorm";

export class allTablesTimeStamps1616646174963 implements MigrationInterface {
    name = 'allTablesTimeStamps1616646174963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "School_Class" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "School_Class" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "Section" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "Section" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "Result" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "Result" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "Subject" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "Subject" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "Teacher" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "Teacher" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "Examinations" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "Examinations" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`COMMENT ON COLUMN "Student"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Student"."updatedAt" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "Student"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Student"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Examinations" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "Examinations" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "Teacher" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "Teacher" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "Subject" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "Subject" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "Result" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "Result" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "Section" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "Section" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "School_Class" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "School_Class" DROP COLUMN "createdAt"`);
    }

}
