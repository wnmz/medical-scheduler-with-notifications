/*
  Warnings:

  - Added the required column `spec_id` to the `DoctorSpecsPrice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `DoctorSpecsPrice` ADD COLUMN `spec_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `DoctorSpecsPrice` ADD CONSTRAINT `DoctorSpecsPrice_spec_id_fkey` FOREIGN KEY (`spec_id`) REFERENCES `Spec`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
