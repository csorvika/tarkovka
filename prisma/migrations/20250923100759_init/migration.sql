/*
  Warnings:

  - You are about to drop the column `avgPrice` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `lastPrice` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `lastUpdated` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `shortName` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `tarkovId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `tradable` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the `PriceHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PriceHistory" DROP CONSTRAINT "PriceHistory_itemId_fkey";

-- DropIndex
DROP INDEX "Item_tarkovId_key";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "avgPrice",
DROP COLUMN "imageUrl",
DROP COLUMN "lastPrice",
DROP COLUMN "lastUpdated",
DROP COLUMN "shortName",
DROP COLUMN "tarkovId",
DROP COLUMN "tradable",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "price" INTEGER;

-- DropTable
DROP TABLE "PriceHistory";

-- DropTable
DROP TABLE "User";
