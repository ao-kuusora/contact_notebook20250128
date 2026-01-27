-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ReadStatus" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "entryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ReadStatus_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ReadStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ReadStatus" ("entryId", "id", "readAt", "userId") SELECT "entryId", "id", "readAt", "userId" FROM "ReadStatus";
DROP TABLE "ReadStatus";
ALTER TABLE "new_ReadStatus" RENAME TO "ReadStatus";
CREATE UNIQUE INDEX "ReadStatus_entryId_userId_key" ON "ReadStatus"("entryId", "userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
