import { test } from "node:test";
import assert from "node:assert/strict";
import { buildProductGrid } from "../js/buildProductGrid.js";
import { buildCartItemsGrid } from "../js/buildCartItemsGrid.js";
import { CartItem } from "../js/models/cartItem.js";

const evilName = "<b>Test</b>";
const evilText = "<img src=x onerror=alert(1)>";
const evilId = 'c"1';

const makeProduct = (changes) => ({
    id: "c1",
    name: "Latte",
    description: "Milk and espresso",
    image: "x.avif",
    rating: 4.5,
    price: 4.5,
    stock: 3,
    ...changes,
});

const makeItem = (changes) =>
    new CartItem({
        id: "c1",
        name: "Latte",
        price: 4.5,
        image: "x.avif",
        quantity: 1,
        stock: 3,
        ...changes,
    });

test("buildProductGrid shows name and description as plain text", () => {
    const html = buildProductGrid([
        makeProduct({
            id: evilId,
            name: evilName,
            description: evilText,
            image: 'x".avif',
        }),
    ]);

    assert.ok(!html.includes(evilName));
    assert.ok(!html.includes(evilText));
    assert.ok(html.includes("&lt;b&gt;Test&lt;/b&gt;"));
    assert.ok(html.includes('data-id="c&quot;1"'));
    assert.ok(!html.includes('x".avif'));
});

test("buildCartItemsGrid shows name as plain text", () => {
    const html = buildCartItemsGrid([makeItem({ id: evilId, name: evilName, image: 'x".avif' })]);

    assert.ok(!html.includes(evilName));
    assert.ok(html.includes("&lt;b&gt;Test&lt;/b&gt;"));
    assert.ok(html.includes('data-id="c&quot;1"'));
    assert.ok(!html.includes('c"1'));
    assert.ok(!html.includes('x".avif'));
});

test("buildProductGrid makes one card for each product", () => {
    const html = buildProductGrid([makeProduct({ id: "a" }), makeProduct({ id: "b" })]);

    assert.equal(html.split('<article class="product-card">').length - 1, 2);
});

test("buildCartItemsGrid makes one row for each item", () => {
    const html = buildCartItemsGrid([makeItem({ id: "a" }), makeItem({ id: "b" })]);

    assert.equal(html.split('<article class="cart-item">').length - 1, 2);
});

test("the grids return an empty string for an empty list", () => {
    assert.equal(buildProductGrid([]), "");
    assert.equal(buildCartItemsGrid([]), "");
});

test("the grids only return HTML. They do not touch the page", () => {
    // there is no document here, so this would throw if a function wrote into the page
    assert.equal(typeof globalThis.document, "undefined");
    assert.doesNotThrow(() => buildProductGrid([makeProduct()]));
    assert.doesNotThrow(() => buildCartItemsGrid([makeItem()]));
});
