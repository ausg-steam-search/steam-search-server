import {MigrationInterface, QueryRunner} from "typeorm";

export class updateSteamGame1606900346336 implements MigrationInterface {
    name = 'updateSteamGame1606900346336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `SteamGame` (`id` int NOT NULL AUTO_INCREMENT, `appId` int NOT NULL, `name` varchar(255) NOT NULL, `detailDescription` text NOT NULL, `aboutTheGame` text NOT NULL, `shortDescription` text NOT NULL, `headerImage` varchar(255) NOT NULL DEFAULT '', `website` varchar(255) NOT NULL DEFAULT '', `background` varchar(255) NOT NULL DEFAULT '', PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `SteamGame`");
    }

}
