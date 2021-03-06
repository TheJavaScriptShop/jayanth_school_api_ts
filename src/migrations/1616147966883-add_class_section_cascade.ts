import {MigrationInterface, QueryRunner} from "typeorm";

export class addClassSectionCascade1616147966883 implements MigrationInterface {
    name = 'addClassSectionCascade1616147966883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Section" DROP CONSTRAINT "FK_233dbe94c01389b2ac7a156bb77"`);
        await queryRunner.query(`ALTER TABLE "Section" ADD CONSTRAINT "FK_233dbe94c01389b2ac7a156bb77" FOREIGN KEY ("schoolClassId") REFERENCES "School_Class"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Section" DROP CONSTRAINT "FK_233dbe94c01389b2ac7a156bb77"`);
        await queryRunner.query(`ALTER TABLE "Section" ADD CONSTRAINT "FK_233dbe94c01389b2ac7a156bb77" FOREIGN KEY ("schoolClassId") REFERENCES "School_Class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
