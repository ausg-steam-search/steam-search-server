import {MigrationInterface, QueryRunner} from "typeorm";

export class createSteamReview1606905344498 implements MigrationInterface {
    name = 'createSteamReview1606905344498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `SteamReview` (`id` int NOT NULL AUTO_INCREMENT, `steamGameId` int NOT NULL, `recommendationId` int NOT NULL, `review` text NOT NULL, `timestampCreatedAt` int NOT NULL, `votedUp` tinyint NOT NULL, `votesUp` int NOT NULL, `votesFunny` int NOT NULL, `weightedVoteScore` int NOT NULL, `commentCount` int NOT NULL, `steamPurchase` tinyint NOT NULL, `writtenDuringEarlyAccess` tinyint NOT NULL, INDEX `IDX_e7b56be7f4e29d77bc2b245917` (`steamGameId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `SteamReview` ADD CONSTRAINT `FK_e7b56be7f4e29d77bc2b245917e` FOREIGN KEY (`steamGameId`) REFERENCES `SteamGame`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `SteamReview` DROP FOREIGN KEY `FK_e7b56be7f4e29d77bc2b245917e`");
        await queryRunner.query("DROP INDEX `IDX_e7b56be7f4e29d77bc2b245917` ON `SteamReview`");
        await queryRunner.query("DROP TABLE `SteamReview`");
    }

}
