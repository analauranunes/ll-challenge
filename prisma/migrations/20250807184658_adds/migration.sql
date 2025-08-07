-- CreateTable
CREATE TABLE "public"."orders" (
    "id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "client_name" TEXT NOT NULL,
    "product_value" DECIMAL(65,30) NOT NULL,
    "purchase_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);
