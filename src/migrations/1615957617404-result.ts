import {MigrationInterface, QueryRunner} from "typeorm";

export class result1615957617404 implements MigrationInterface {
    name = 'result1615957617404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "result" DROP CONSTRAINT "FK_4782e86a1f84152f65b2fdabf69"`);
        await queryRunner.query(`ALTER TABLE "result" ADD CONSTRAINT "FK_4782e86a1f84152f65b2fdabf69" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "result" DROP CONSTRAINT "FK_4782e86a1f84152f65b2fdabf69"`);
        await queryRunner.query(`ALTER TABLE "result" ADD CONSTRAINT "FK_4782e86a1f84152f65b2fdabf69" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

}
