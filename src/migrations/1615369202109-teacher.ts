import {MigrationInterface, QueryRunner} from "typeorm";

export class teacher1615369202109 implements MigrationInterface {
    name = 'teacher1615369202109'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Subject" ALTER COLUMN "teacher" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Subject"."teacher" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "Subject"."teacher" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Subject" ALTER COLUMN "teacher" SET NOT NULL`);
    }

}
