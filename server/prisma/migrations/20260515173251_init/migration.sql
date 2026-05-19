-- CreateTable
CREATE TABLE "users" (
    "userId" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "passwordHash" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_userName_key" ON "users"("userName");
