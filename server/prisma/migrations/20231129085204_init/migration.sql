/*
  Warnings:

  - You are about to drop the column `content` on the `Cat` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Cat` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Cat` table. All the data in the column will be lost.
  - Added the required column `age` to the `Cat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Cat` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "breed" TEXT NOT NULL DEFAULT 'not-declared',
    "ownerId" INTEGER,
    CONSTRAINT "Cat_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Cat" ("id", "ownerId") SELECT "id", "ownerId" FROM "Cat";
DROP TABLE "Cat";
ALTER TABLE "new_Cat" RENAME TO "Cat";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
