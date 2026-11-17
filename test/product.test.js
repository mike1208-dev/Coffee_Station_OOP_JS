import { test } from "node:test";
import assert from "node:assert/strict";
import { Product } from "../js/models/product.js";
import { Coffee } from "../js/models/coffee.js";

const makeProduct = (changes) =>
    new Product({
        id: "c1",
        name: "Latte",
        category: "Coffee",
        description: "Milk coffee",
        price: 4.5,
        image: "x.avif",
        rating: 4.8,
        stock: 12,
        ...changes,
    });

test("constructor saves all values", () => {
    const product = makeProduct();

    assert.equal(product.id, "c1");
    assert.equal(product.name, "Latte");
    assert.equal(product.category, "Coffee");
    assert.equal(product.description, "Milk coffee");
    assert.equal(product.price, 4.5);
    assert.equal(product.image, "x.avif");
    assert.equal(product.rating, 4.8);
    assert.equal(product.stock, 12);
});

test("throws when price is 0", () => {
    assert.throws(() => makeProduct({ price: 0 }), /Price must be greater than zero/);
});

test("throws when stock is negative", () => {
    assert.throws(() => makeProduct({ stock: -1 }));
});

test("stock 0 is allowed", () => {
    assert.doesNotThrow(() => makeProduct({ stock: 0 }));
});

test("isTopSelling is true for rating 4.9", () => {
    assert.equal(makeProduct({ rating: 4.9 }).isTopSelling(), true);
});

test("isTopSelling is false for rating 4.8", () => {
    assert.equal(makeProduct({ rating: 4.8 }).isTopSelling(), false);
});

test("checkStock is true when stock is more than 0", () => {
    assert.equal(makeProduct({ stock: 1 }).checkStock(), true);
});

test("checkStock is false when stock is 0", () => {
    assert.equal(makeProduct({ stock: 0 }).checkStock(), false);
});

test("Coffee keeps temperature and origin and is a Product", () => {
    const coffee = new Coffee({
        id: "c1",
        name: "Latte",
        category: "Coffee",
        description: "Milk coffee",
        price: 4.5,
        image: "x.avif",
        rating: 4.8,
        stock: 12,
        temperature: "hot",
        origin: "Brazil",
    });

    assert.equal(coffee.temperature, "hot");
    assert.equal(coffee.origin, "Brazil");
    assert.equal(coffee.price, 4.5);
    assert.equal(coffee instanceof Product, true);
});
