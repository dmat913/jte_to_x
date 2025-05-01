-- CreateTable
CREATE TABLE "Translation" (
    "id" SERIAL NOT NULL,
    "originalJa" TEXT NOT NULL,
    "translatedEn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Translation_pkey" PRIMARY KEY ("id")
);
