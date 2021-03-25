import {MigrationInterface, QueryRunner} from "typeorm";

export class allTablesTimeStamps1616646174963 implements MigrationInterface {
    name = 'allTablesTimeStamps1616646174963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school_class" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "school_class" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "section" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "section" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "result" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "result" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "Subject" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "Subject" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "Teacher" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "Teacher" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "examinations" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "examinations" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`COMMENT ON COLUMN "Student"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Student"."updatedAt" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "Student"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Student"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "examinations" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "examinations" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "Teacher" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "Teacher" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "Subject" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "Subject" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "result" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "result" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "section" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "section" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "school_class" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "school_class" DROP COLUMN "createdAt"`);
    }

}
