import {MigrationInterface, QueryRunner} from "typeorm";

export class createSteamGame1606897535455 implements MigrationInterface {
    name = 'createSteamGame1606897535455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `SteamGame` (`id` int NOT NULL AUTO_INCREMENT, `appId` int NOT NULL, `name` varchar(255) NOT NULL, `detailDescription` text NOT NULL, `aboutTheGame` text NOT NULL, `shortDescription` varchar(255) NOT NULL, `headerImage` varchar(255) NOT NULL, `website` varchar(255) NOT NULL, `background` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `SteamGame`");
    }

}
