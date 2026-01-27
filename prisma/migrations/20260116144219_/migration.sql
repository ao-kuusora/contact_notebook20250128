/*
  Warnings:

  - You are about to drop the column `activated` on the `Couple` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `Couple` table. All the data in the column will be lost.
  - Added the required column `inviteCode` to the `Couple` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Couple" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "inviteCode" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Couple" ("createdAt", "id") SELECT "createdAt", "id" FROM "Couple";
DROP TABLE "Couple";
ALTER TABLE "new_Couple" RENAME TO "Couple";
CREATE UNIQUE INDEX "Couple_inviteCode_key" ON "Couple"("inviteCode");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
