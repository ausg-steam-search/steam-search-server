import {MigrationInterface, QueryRunner} from "typeorm";

export class updateSteamReview1606905663324 implements MigrationInterface {
    name = 'updateSteamReview1606905663324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `SteamReview` ADD UNIQUE INDEX `IDX_d5f683709fcdeccf09b3dd7011` (`recommendationId`)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `SteamReview` DROP INDEX `IDX_d5f683709fcdeccf09b3dd7011`");
    }

}
