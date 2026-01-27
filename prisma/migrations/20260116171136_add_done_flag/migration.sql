-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "coupleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "dueDate" DATETIME,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Entry_coupleId_fkey" FOREIGN KEY ("coupleId") REFERENCES "Couple" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Entry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Entry" ("content", "coupleId", "createdAt", "dueDate", "id", "type", "userId") SELECT "content", "coupleId", "createdAt", "dueDate", "id", "type", "userId" FROM "Entry";
DROP TABLE "Entry";
ALTER TABLE "new_Entry" RENAME TO "Entry";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
