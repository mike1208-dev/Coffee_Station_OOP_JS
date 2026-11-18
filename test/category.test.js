import { test } from "node:test";
import assert from "node:assert/strict";
import { Category } from "../js/models/category.js";
import { products } from "../js/data/product.js";

const isSortedBy = (list, key, direction) =>
    list.every(
        (item, i) =>
            i === 0 ||
            (direction === "desc" ? list[i - 1][key] >= item[key] : list[i - 1][key] <= item[key])
    );

test("All returns every product", () => {
    const category = new Category();

    const result = category.filterByCategory("All");

    assert.equal(result.length, products.length);
    assert.deepEqual(
        result.map((product) => product.id),
        products.map((product) => product.id)
    );
});

test("each category returns only its own products", () => {
    const category = new Category();

    for (const name of ["Coffee", "Tea", "Bread"]) {
        const result = category.filterByCategory(name);
        const expected = products.filter((product) => product.category === name);

        assert.equal(result.length, expected.length);
        assert.equal(
            result.every((product) => product.category === name),
            true
        );
    }
});

test("findById returns the right product", () => {
    const category = new Category();

    const result = category.findById("c1");

    assert.equal(result.id, "c1");
    assert.equal(result.name, "Classic Latte");
});

test("findById returns undefined for an unknown id", () => {
    const category = new Category();

    assert.equal(category.findById("unknown"), undefined);
});

test("price-htl sorts from high to low price", () => {
    const category = new Category();

    assert.equal(isSortedBy(category.sortBy("price-htl"), "price", "desc"), true);
});

test("price-lth sorts from low to high price", () => {
    const category = new Category();

    assert.equal(isSortedBy(category.sortBy("price-lth"), "price", "asc"), true);
});

test("rating sorts from high to low rating", () => {
    const category = new Category();

    assert.equal(isSortedBy(category.sortBy("rating"), "rating", "desc"), true);
});

test("stock sorts from high to low stock", () => {
    const category = new Category();

    assert.equal(isSortedBy(category.sortBy("stock"), "stock", "desc"), true);
});

test("default keeps the original data order", () => {
    const category = new Category();

    category.sortBy("price-htl");
    const result = category.sortBy("default");

    assert.deepEqual(
        result.map((product) => product.id),
        products.map((product) => product.id)
    );
});

test("sort is kept after changing the category", () => {
    const category = new Category();

    category.sortBy("price-lth");
    const result = category.filterByCategory("Tea");

    assert.equal(result.length, products.filter((product) => product.category === "Tea").length);
    assert.equal(
        result.every((product) => product.category === "Tea"),
        true
    );
    assert.equal(isSortedBy(result, "price", "asc"), true);
});

test("throws for an unknown sort", () => {
    const category = new Category();

    assert.throws(() => category.sortBy("name"), /Invalid sorting property/);
});

test("every product keeps all of its data fields", () => {
    const category = new Category();

    for (const data of products) {
        const product = category.findById(data.id);

        for (const [key, value] of Object.entries(data)) {
            assert.equal(product[key], value, `${data.id} ${key}`);
        }
    }
});
