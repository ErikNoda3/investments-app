/*
  Warnings:

  - You are about to drop the column `clientId` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Asset` table. All the data in the column will be lost.
  - Added the required column `price` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Asset` DROP FOREIGN KEY `Asset_clientId_fkey`;

-- DropIndex
DROP INDEX `Asset_clientId_fkey` ON `Asset`;

-- AlterTable
ALTER TABLE `Asset` DROP COLUMN `clientId`,
    DROP COLUMN `value`,
    ADD COLUMN `price` DOUBLE NOT NULL;

-- CreateTable
CREATE TABLE `ClientAsset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clientId` INTEGER NOT NULL,
    `assetId` INTEGER NOT NULL,
    `quantity` DOUBLE NOT NULL,

    UNIQUE INDEX `ClientAsset_clientId_assetId_key`(`clientId`, `assetId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ClientAsset` ADD CONSTRAINT `ClientAsset_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClientAsset` ADD CONSTRAINT `ClientAsset_assetId_fkey` FOREIGN KEY (`assetId`) REFERENCES `Asset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
