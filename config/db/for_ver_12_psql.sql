CREACREATE DATABASE jabon;

\c jabon;

CREATE TABLE "user" (
  "rut" INT UNIQUE PRIMARY KEY NOT NULL,
  "name" VARCHAR NOT NULL,
  "last_name" VARCHAR NOT NULL CHECK (length(password) >= 6),
  "postal_code" INT UNIQUE NOT NULL,
  "email" VARCHAR UNIQUE NOT NULL,
  "password" VARCHAR NOT NULL,
  "birth_date" TIMESTAMP NOT NULL CHECK (birth_date < created_at ),
  "rol" VARCHAR NOT NULL,
  "is_banned" BOOLEAN NOT NULL DEFAULT (false),
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMP
);

CREATE TABLE "address" (
  "postal_code" INT UNIQUE NOT NULL PRIMARY KEY REFERENCES "user"(postal_code),
  "street_name" VARCHAR NOT NULL,
  "phone" VARCHAR NOT NULL,
  "Number" INT NOT NULL,
  "commune" VARCHAR NOT NULL,
  "city" VARCHAR NOT NULL,
  "region" VARCHAR NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL ,
  "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE "products" (
  "id" SERIAL UNIQUE PRIMARY KEY,
  "name" VARCHAR NOT NULL,
  "description" VARCHAR NOT NULL,
  "price" INT NOT NULL,
  "stock" INT NOT NULL,
  "product_image" TEXT NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL ,
  "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE "favorites" (
  "favorites_id" SERIAL UNIQUE ,
  "client_rut" INT REFERENCES "user"(rut),
  "product_id" INT REFERENCES "products"(id),
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL ,
  "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE "store_cart" (
  "id" SERIAL UNIQUE PRIMARY KEY,
  "client_rut" INT NOT NULL REFERENCES "user"(rut),
  "product_code" INT NOT NULL,
  "product_price" INT NOT NULL,
  "product_amount" INT NOT NULL,
  "total_price" INT NOT NULL
);

CREATE TABLE "buy_order" (
  "id" SERIAL UNIQUE PRIMARY KEY,
  "cart_id" INT NOT NULL REFERENCES "store_cart"(id),
  "client_rut" INT NOT NULL ,
  "postal_code" INT NOT NULL REFERENCES "address"(postal_code),
  "product_code" INT NOT NULL,
  "product_price" INT NOT NULL,
  "product_amount" INT NOT NULL,
  "total_price" INT NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE "order_history" (
  "id" SERIAL UNIQUE PRIMARY KEY,
  "client_rut" INT REFERENCES "user"(rut),
  "postal_code" INT NOT NULL,
  "product_code" INT NOT NULL,
  "product_price" INT NOT NULL,
  "product_amount" INT NOT NULL,
  "total_price" INT NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  "send_at" TIMESTAMP

);

-- actualizar la columna.. "update_at" de cada tabla que la usa... listadas abajo

CREATE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language plpgsql;

CREATE TRIGGER user_updated_at_trigger
BEFORE UPDATE ON "user"
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at();

CREATE TRIGGER user_updated_at_trigger
BEFORE UPDATE ON "address"
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at();

CREATE TRIGGER user_updated_at_trigger
BEFORE UPDATE ON "products"
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at();

CREATE TRIGGER user_updated_at_trigger
BEFORE UPDATE ON "favorites"
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at();
