-- AlterTable
ALTER TABLE "Dish" ADD COLUMN     "ingredients" TEXT,
ADD COLUMN     "isVegetarian" BOOLEAN NOT NULL DEFAULT false;
