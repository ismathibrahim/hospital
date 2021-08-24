/*
  Warnings:

  - Added the required column `reason` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notes` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "reason" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT NOT NULL;
