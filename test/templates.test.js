import { test } from "node:test";
import assert from "node:assert/strict";
import { buildProductGrid } from "../js/buildProductGrid.js";
import { buildCartItemsGrid } from "../js/buildCartItemsGrid.js";
import { CartItem } from "../js/models/cartItem.js";

const evilName = "<b>Test</b>";
const evilText = "<img src=x onerror=alert(1)>";
const evilId = 'c"1';

const useFakePage = (t) => {
    const element = { innerHTML: "", textContent: "" };
    globalThis.document = { getElementById: () => element };
    t.after(() => delete globalThis.document);
    return element;
};

test("buildProductGrid shows name and description as plain text", (t) => {
    const page = useFakePage(t);

    buildProductGrid([
        {
            id: evilId,
            name: evilName,
            description: evilText,
            image: 'x".avif',
            rating: 4.5,
            price: 4.5,
            stock: 3,
        },
    ]);

    assert.ok(!page.innerHTML.includes(evilName));
    assert.ok(!page.innerHTML.includes(evilText));
    assert.ok(page.innerHTML.includes("&lt;b&gt;Test&lt;/b&gt;"));
    assert.ok(page.innerHTML.includes('data-id="c&quot;1"'));
});

test("buildCartItemsGrid shows name as plain text", (t) => {
    const page = useFakePage(t);
    const item = new CartItem({
        id: evilId,
        name: evilName,
        price: 4.5,
        image: 'x".avif',
        quantity: 1,
        stock: 3,
    });

    buildCartItemsGrid([item]);

    assert.ok(!page.innerHTML.includes(evilName));
    assert.ok(page.innerHTML.includes("&lt;b&gt;Test&lt;/b&gt;"));
    assert.ok(page.innerHTML.includes('data-id="c&quot;1"'));
});
