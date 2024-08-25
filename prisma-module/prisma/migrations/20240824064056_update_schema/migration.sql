/*
  Warnings:

  - The primary key for the `Spec` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `DoctorSpecsPrice` DROP FOREIGN KEY `DoctorSpecsPrice_spec_id_fkey`;

-- AlterTable
ALTER TABLE `DoctorSpecsPrice` MODIFY `spec_id` VARCHAR(191) NOT NULL,
    MODIFY `work_end_time` VARCHAR(191) NULL DEFAULT '21:00',
    MODIFY `work_start_time` VARCHAR(191) NULL DEFAULT '09:00';

-- AlterTable
ALTER TABLE `Schedule` MODIFY `type` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Spec` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `DoctorSpecsPrice` ADD CONSTRAINT `DoctorSpecsPrice_spec_id_fkey` FOREIGN KEY (`spec_id`) REFERENCES `Spec`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
