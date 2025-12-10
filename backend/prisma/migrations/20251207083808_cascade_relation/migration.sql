/*
  Warnings:

  - You are about to alter the column `tanggal` on the `news` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `tanggal` on the `reports` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `tanggal` on the `status_reports` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `news` MODIFY `tanggal` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `reports` MODIFY `tanggal` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `status_reports` MODIFY `tanggal` TIMESTAMP NOT NULL;
