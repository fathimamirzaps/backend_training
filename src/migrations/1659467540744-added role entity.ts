import {MigrationInterface, QueryRunner} from "typeorm";

export class addedRoleEntity1659467540744 implements MigrationInterface {
    name = 'addedRoleEntity1659467540744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
    }

}
