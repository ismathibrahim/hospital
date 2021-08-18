/*
  Warnings:

  - You are about to drop the column `departmentId` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `speciality` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `specialtyId` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_departmentId_fkey";

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "departmentId",
DROP COLUMN "speciality",
ADD COLUMN     "specialtyId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Department";

-- CreateTable
CREATE TABLE "Specialty" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Doctor" ADD FOREIGN KEY ("specialtyId") REFERENCES "Specialty"("id") ON DELETE CASCADE ON UPDATE CASCADE;
