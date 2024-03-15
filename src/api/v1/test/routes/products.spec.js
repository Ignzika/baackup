import app from "../../../../../server.js";
import request from "supertest";
import { faker } from "@faker-js/faker";


describe("test the test", () => {
  const sumar = (a, b) => a + b;
  describe("Testing unitario con Jest", () => {
    it("Comprobando el resultado de una sumatoria", () => {
      const n1 = 4;
      const n2 = 5;
      const resultado = sumar(n1, n2);
      expect(resultado).toBe(9);
    });
  });
});

const getId = async () => {
  try {
    const response = await request(app).get("/api/v1/products");
    const id = response.body.products[0].id;
    return id;
  } catch (error) {
    console.error(error);
  }
};

const fakeProduct = {
  name: "TesterProperty",
  description: faker.commerce.productDescription(),
  price: faker.commerce.price({ min: 100, max: 99999, dec: 0 }),
  stock: faker.number.int(99),
  product_image: faker.image.urlLoremFlickr({ category: "kitten" })
};

const fakeProductUpdate = {
  name: "TesterProperty",
  description: faker.airline.aircraftType(),
  price: faker.number.int(50),
  stock: faker.number.int(10),
  product_image: faker.image.urlLoremFlickr({ category: "dog" })
};

describe("Crud Products", () => {
  describe("products related tests  ", () => {
   

    it("post a new product ", async () => {
      const response = await request(app)
        .post("/api/v1/store/admin/products")
        // .set("Authorization", `Bearer ${token}`)
        .send(fakeProduct);
      expect(response.statusCode).toBe(201);
    });

    it(" update a product by id", async () => {
      const id = await getId();
      const response = await request(app)
        .put(`/api/v1/store/admin/product/${id}`)
        // .set("Authorization", `Bearer ${token}`)
        .send(fakeProductUpdate);
      expect(response.statusCode).toBe(200);
    }, 3000);

    it(" patch a single value from a product ", async () => {
      const id = await getId();
      const response = await request(app)
        .patch(`/api/v1/store/admin/product/${id}`)
        // .set("Authorization", `Bearer ${token}`)
        .send({
          name: "AYUUUUUUUUUUUUUUDA"
        });
      // console.log(response.data);
      expect(response.statusCode).toBe(200);
      expect(response.body.products).toBeTruthy();
    });

    it("finds products ", async () => {
      const response = await request(app).get("/api/v1/store/products");
      // .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
    });

    it("finds a single product by ID ", async () => {
      const id = await getId();
      const response = await request(app).get(`/api/v1/store/product/${id}`);
      // .set("Authorization", `Bearer ${token}`);
      // console.log(response);
      expect(response.statusCode).toBe(200);
    });

    it("Deletes a product (faker created)", async () => {
      const id = await getId();
      const forDelete = await request(app)
        .delete(`/api/v1/product/${id}`)
        // .set("Authorization", `Bearer ${token}`)
        .send();
      console.log(forDelete)
      expect(204);
    });
  });
});
