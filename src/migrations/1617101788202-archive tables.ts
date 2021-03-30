import {MigrationInterface, QueryRunner} from "typeorm";

export class archiveTables1617101788202 implements MigrationInterface {
    name = 'archiveTables1617101788202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "School_Class_Archive" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "id" SERIAL NOT NULL, "className" integer NOT NULL, "academicYearId" integer, CONSTRAINT "PK_96890598a1471441a39cead1e48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Section_Archive" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "schoolClassId" integer, "academicYearId" integer, CONSTRAINT "PK_972eab75ca9ab529611d48228ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Result_Archive" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "id" SERIAL NOT NULL, "marks" integer NOT NULL, "studentId" integer, "examId" integer, "academicYearId" integer, CONSTRAINT "PK_dcf0daa3428cb4c0be160ad4e86" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Student_Archive" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "id" SERIAL NOT NULL, "enrollmentId" character varying NOT NULL, "name" character varying NOT NULL, "gender" character varying NOT NULL, "sectionId" integer, "academicYearId" integer, CONSTRAINT "UQ_dcad12469ce27bc08c9466fe787" UNIQUE ("enrollmentId"), CONSTRAINT "PK_8e9d98ef790533ed20835c920ae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Subject_Archive" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "teacherId" integer, "academicYearId" integer, CONSTRAINT "PK_1a3d442819d89d806d4aaf822bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Teacher_Archive" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "gender" character varying NOT NULL, "academicYearId" integer, CONSTRAINT "PK_14e45cd9499cf5bfcc13e4f080e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Examinations_Archive" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "id" SERIAL NOT NULL, "exam_name" character varying NOT NULL, "subject_name" character varying NOT NULL, "total_marks" integer NOT NULL, "max_time" integer, "teacherId" integer, "academicYearId" integer, CONSTRAINT "PK_088d55093912a7a276c746ad855" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Student_Subject_Archive" ("studentArchiveId" integer NOT NULL, "subjectArchiveId" integer NOT NULL, CONSTRAINT "PK_e172a76df2bf34e861725d0c329" PRIMARY KEY ("studentArchiveId", "subjectArchiveId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1063340eb553266d01596faff1" ON "Student_Subject_Archive" ("studentArchiveId") `);
        await queryRunner.query(`CREATE INDEX "IDX_02cec8bf706f681ade5af6045b" ON "Student_Subject_Archive" ("subjectArchiveId") `);
        await queryRunner.query(`ALTER TABLE "Student" ADD "enrollmentId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Student" ADD CONSTRAINT "UQ_5d016989036f3c5e26d4770236a" UNIQUE ("enrollmentId")`);
        await queryRunner.query(`COMMENT ON COLUMN "AcademicYear"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "AcademicYear"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "school_class"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "school_class"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "section"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "section"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "result"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "result"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Student"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Student"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Subject"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Subject"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Teacher"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Teacher"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "examinations"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "examinations"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "School_Class_Archive" ADD CONSTRAINT "FK_87e07c98f235fc2a82002648ab0" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Section_Archive" ADD CONSTRAINT "FK_f0e413dfeaf3ac373681efa9185" FOREIGN KEY ("schoolClassId") REFERENCES "School_Class_Archive"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Section_Archive" ADD CONSTRAINT "FK_3d360b1d324a7773835967f947d" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Result_Archive" ADD CONSTRAINT "FK_90c2b102f1eb455167c20ab431a" FOREIGN KEY ("studentId") REFERENCES "Student_Archive"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Result_Archive" ADD CONSTRAINT "FK_30894b77d3a64bcdcad8442b922" FOREIGN KEY ("examId") REFERENCES "Examinations_Archive"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Result_Archive" ADD CONSTRAINT "FK_72354f3f33947fb7ff6090e7315" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Student_Archive" ADD CONSTRAINT "FK_98ec60f49bb074961c5a5552193" FOREIGN KEY ("sectionId") REFERENCES "Section_Archive"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Student_Archive" ADD CONSTRAINT "FK_1767ec78f0fd8bacf84d0c84faa" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Subject_Archive" ADD CONSTRAINT "FK_31dda0cf7081e0ae786ec9600fd" FOREIGN KEY ("teacherId") REFERENCES "Teacher_Archive"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Subject_Archive" ADD CONSTRAINT "FK_d38181dcfb8f239773b475431f8" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Teacher_Archive" ADD CONSTRAINT "FK_909a0eccc7f179f59ad2385f001" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Examinations_Archive" ADD CONSTRAINT "FK_5a49ed4c0b4fb34ec983f60164b" FOREIGN KEY ("teacherId") REFERENCES "Teacher_Archive"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Examinations_Archive" ADD CONSTRAINT "FK_59d2ac97140bf5811a1b6fff4ea" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Student_Subject_Archive" ADD CONSTRAINT "FK_1063340eb553266d01596faff14" FOREIGN KEY ("studentArchiveId") REFERENCES "Student_Archive"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Student_Subject_Archive" ADD CONSTRAINT "FK_02cec8bf706f681ade5af6045b9" FOREIGN KEY ("subjectArchiveId") REFERENCES "Subject_Archive"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Student_Subject_Archive" DROP CONSTRAINT "FK_02cec8bf706f681ade5af6045b9"`);
        await queryRunner.query(`ALTER TABLE "Student_Subject_Archive" DROP CONSTRAINT "FK_1063340eb553266d01596faff14"`);
        await queryRunner.query(`ALTER TABLE "Examinations_Archive" DROP CONSTRAINT "FK_59d2ac97140bf5811a1b6fff4ea"`);
        await queryRunner.query(`ALTER TABLE "Examinations_Archive" DROP CONSTRAINT "FK_5a49ed4c0b4fb34ec983f60164b"`);
        await queryRunner.query(`ALTER TABLE "Teacher_Archive" DROP CONSTRAINT "FK_909a0eccc7f179f59ad2385f001"`);
        await queryRunner.query(`ALTER TABLE "Subject_Archive" DROP CONSTRAINT "FK_d38181dcfb8f239773b475431f8"`);
        await queryRunner.query(`ALTER TABLE "Subject_Archive" DROP CONSTRAINT "FK_31dda0cf7081e0ae786ec9600fd"`);
        await queryRunner.query(`ALTER TABLE "Student_Archive" DROP CONSTRAINT "FK_1767ec78f0fd8bacf84d0c84faa"`);
        await queryRunner.query(`ALTER TABLE "Student_Archive" DROP CONSTRAINT "FK_98ec60f49bb074961c5a5552193"`);
        await queryRunner.query(`ALTER TABLE "Result_Archive" DROP CONSTRAINT "FK_72354f3f33947fb7ff6090e7315"`);
        await queryRunner.query(`ALTER TABLE "Result_Archive" DROP CONSTRAINT "FK_30894b77d3a64bcdcad8442b922"`);
        await queryRunner.query(`ALTER TABLE "Result_Archive" DROP CONSTRAINT "FK_90c2b102f1eb455167c20ab431a"`);
        await queryRunner.query(`ALTER TABLE "Section_Archive" DROP CONSTRAINT "FK_3d360b1d324a7773835967f947d"`);
        await queryRunner.query(`ALTER TABLE "Section_Archive" DROP CONSTRAINT "FK_f0e413dfeaf3ac373681efa9185"`);
        await queryRunner.query(`ALTER TABLE "School_Class_Archive" DROP CONSTRAINT "FK_87e07c98f235fc2a82002648ab0"`);
        await queryRunner.query(`COMMENT ON COLUMN "examinations"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "examinations"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Teacher"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Teacher"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Subject"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Subject"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Student"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Student"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "result"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "result"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "section"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "section"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "school_class"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "school_class"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "AcademicYear"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "AcademicYear"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Student" DROP CONSTRAINT "UQ_5d016989036f3c5e26d4770236a"`);
        await queryRunner.query(`ALTER TABLE "Student" DROP COLUMN "enrollmentId"`);
        await queryRunner.query(`DROP INDEX "IDX_02cec8bf706f681ade5af6045b"`);
        await queryRunner.query(`DROP INDEX "IDX_1063340eb553266d01596faff1"`);
        await queryRunner.query(`DROP TABLE "Student_Subject_Archive"`);
        await queryRunner.query(`DROP TABLE "Examinations_Archive"`);
        await queryRunner.query(`DROP TABLE "Teacher_Archive"`);
        await queryRunner.query(`DROP TABLE "Subject_Archive"`);
        await queryRunner.query(`DROP TABLE "Student_Archive"`);
        await queryRunner.query(`DROP TABLE "Result_Archive"`);
        await queryRunner.query(`DROP TABLE "Section_Archive"`);
        await queryRunner.query(`DROP TABLE "School_Class_Archive"`);
    }

}
