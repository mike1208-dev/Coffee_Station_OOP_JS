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

test("sort and category names are the values used in index.html", () => {
    assert.equal(ALL_CATEGORIES, "All");
    assert.deepEqual(Object.values(SORT), ["default", "price-htl", "price-lth", "rating", "stock"]);
});
