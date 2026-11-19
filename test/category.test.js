import { test } from "node:test";
import assert from "node:assert/strict";
import { Category, ALL_CATEGORIES, SORT } from "../js/models/category.js";
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

test("getProducts All default returns every product in data order", () => {
    const category = new Category();

    const result = category.getProducts(ALL_CATEGORIES, SORT.DEFAULT);

    assert.deepEqual(
        result.map((p) => p.id),
        products.map((p) => p.id)
    );
});

test("getProducts throws for an unknown category", () => {
    const category = new Category();

    assert.throws(() => category.getProducts("Juice", SORT.DEFAULT), /Unknown category/);
});

test("getProducts throws for an unknown sort", () => {
    const category = new Category();

    assert.throws(() => category.getProducts(ALL_CATEGORIES, "name"), /Invalid sorting property/);
});

test("getProducts does not remember earlier calls", () => {
    const category = new Category();

    category.getProducts("Tea", SORT.PRICE_LOW_TO_HIGH);
    const result = category.getProducts(ALL_CATEGORIES, SORT.DEFAULT);

    assert.deepEqual(
        result.map((p) => p.id),
        products.map((p) => p.id)
    );
});

const sortChecks = {
    [SORT.PRICE_HIGH_TO_LOW]: ["price", "desc"],
    [SORT.PRICE_LOW_TO_HIGH]: ["price", "asc"],
    [SORT.RATING]: ["rating", "desc"],
    [SORT.STOCK]: ["stock", "desc"],
};

test("getProducts filters and sorts every category with every sort", () => {
    const category = new Category();

    for (const categoryName of [ALL_CATEGORIES, "Coffee", "Tea", "Bread"]) {
        const expectedIds = products
            .filter((p) => categoryName === ALL_CATEGORIES || p.category === categoryName)
            .map((p) => p.id);

        for (const sort of Object.values(SORT)) {
            const result = category.getProducts(categoryName, sort);
            const ids = result.map((p) => p.id);
            const message = `${categoryName} ${sort}`;

            assert.deepEqual([...ids].sort(), [...expectedIds].sort(), message);

            if (sort === SORT.DEFAULT) {
                assert.deepEqual(ids, expectedIds, message);
            } else {
                const [key, direction] = sortChecks[sort];
                assert.equal(isSortedBy(result, key, direction), true, message);
            }
        }
    }
});
