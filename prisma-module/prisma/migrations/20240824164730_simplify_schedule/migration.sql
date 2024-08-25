/*
  Warnings:

  - You are about to drop the column `date` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `doctorSpecsPriceId` on the `Schedule` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Schedule` DROP FOREIGN KEY `Schedule_doctorSpecsPriceId_fkey`;

-- AlterTable
ALTER TABLE `Schedule` DROP COLUMN `date`,
    DROP COLUMN `doctorSpecsPriceId`;
