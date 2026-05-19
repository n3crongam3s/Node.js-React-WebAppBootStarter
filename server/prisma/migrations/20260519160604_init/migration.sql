-- CreateTable
CREATE TABLE "users" (
    "UserID" SERIAL NOT NULL,
    "UserName" TEXT NOT NULL,
    "PasswordHash" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("UserID")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_UserName_key" ON "users"("UserName");
