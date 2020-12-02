import {MigrationInterface, QueryRunner} from "typeorm";

export class updateSteamReview1606905545108 implements MigrationInterface {
    name = 'updateSteamReview1606905545108'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `SteamReview` DROP COLUMN `weightedVoteScore`");
        await queryRunner.query("ALTER TABLE `SteamReview` ADD `weightedVoteScore` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `SteamReview` DROP COLUMN `weightedVoteScore`");
        await queryRunner.query("ALTER TABLE `SteamReview` ADD `weightedVoteScore` int NOT NULL");
    }

}
