/*
  Warnings:

  - The primary key for the `DoctorSpecsPrice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `is_free` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `time_from` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `startTime` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeSlotId` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Schedule` DROP FOREIGN KEY `Schedule_doctorSpecsPriceId_fkey`;

-- AlterTable
ALTER TABLE `DoctorSpecsPrice` DROP PRIMARY KEY,
    ADD COLUMN `work_end_time` VARCHAR(191) NOT NULL DEFAULT '21:00',
    ADD COLUMN `work_start_time` VARCHAR(191) NOT NULL DEFAULT '09:00',
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Schedule` DROP COLUMN `is_free`,
    DROP COLUMN `time_from`,
    ADD COLUMN `startTime` DATETIME(3) NOT NULL,
    ADD COLUMN `timeSlotId` VARCHAR(191) NOT NULL,
    MODIFY `doctorSpecsPriceId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `TimeSlot` (
    `id` VARCHAR(191) NOT NULL,
    `startTime` DATETIME(3) NOT NULL,
    `endTime` DATETIME(3) NOT NULL,
    `isAvailable` BOOLEAN NOT NULL DEFAULT true,
    `doctorSpecsPriceId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TimeSlot` ADD CONSTRAINT `TimeSlot_doctorSpecsPriceId_fkey` FOREIGN KEY (`doctorSpecsPriceId`) REFERENCES `DoctorSpecsPrice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_doctorSpecsPriceId_fkey` FOREIGN KEY (`doctorSpecsPriceId`) REFERENCES `DoctorSpecsPrice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_timeSlotId_fkey` FOREIGN KEY (`timeSlotId`) REFERENCES `TimeSlot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
