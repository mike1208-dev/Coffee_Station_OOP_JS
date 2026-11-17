import { test } from "node:test";
import assert from "node:assert/strict";
import { CartItem } from "../js/models/cartItem.js";

const makeItem = (changes) =>
    new CartItem({
        id: "c1",
        name: "Latte",
        price: 10,
        image: "x.avif",
        quantity: 1,
        stock: 30,
        ...changes,
    });

test("no discount for 1 to 5 items", () => {
    assert.equal(makeItem({ quantity: 5 }).calcDiscount(), 1);
});

test("10% off for 6 items", () => {
    assert.equal(makeItem({ quantity: 6 }).calcDiscount(), 0.9);
});

test("10% off for 10 items", () => {
    assert.equal(makeItem({ quantity: 10 }).calcDiscount(), 0.9);
});

test("20% off for 11 items", () => {
    assert.equal(makeItem({ quantity: 11 }).calcDiscount(), 0.8);
});

test("20% off for 15 items", () => {
    assert.equal(makeItem({ quantity: 15 }).calcDiscount(), 0.8);
});

test("30% off for 16 items", () => {
    assert.equal(makeItem({ quantity: 16 }).calcDiscount(), 0.7);
});

test("30% off for 20 items", () => {
    assert.equal(makeItem({ quantity: 20 }).calcDiscount(), 0.7);
});

test("40% off for 21 items", () => {
    assert.equal(makeItem({ quantity: 21 }).calcDiscount(), 0.6);
});

test("subtotal is price times quantity", () => {
    assert.equal(makeItem({ quantity: 3 }).getSubTotal(), 30);
});

test("subtotal with discount uses the tier rate", () => {
    assert.equal(makeItem({ quantity: 6 }).getSubTotalWithDiscount(), 54);
});

test("throws when price is 0", () => {
    assert.throws(() => makeItem({ price: 0 }), /Price must be greater than zero/);
});

test("throws when quantity is 0", () => {
    assert.throws(() => makeItem({ quantity: 0 }), /Quantity must be greater than zero/);
});

test("throws when quantity is more than stock", () => {
    assert.throws(() => makeItem({ quantity: 31 }), /Quantity cannot be more than stock/);
});

test("quantity equal to stock is allowed", () => {
    assert.doesNotThrow(() => makeItem({ quantity: 1, stock: 1 }));
});

test("increase stops at the stock and returns false", () => {
    const item = makeItem({ quantity: 2, stock: 2 });

    assert.equal(item.increase(), false);
    assert.equal(item.quantity, 2);
});

test("decrease stops at 1 and returns false", () => {
    const item = makeItem({ quantity: 1 });

    assert.equal(item.decrease(), false);
    assert.equal(item.quantity, 1);
});

test("increase adds one and returns true below the stock", () => {
    const item = makeItem({ quantity: 1, stock: 2 });

    assert.equal(item.increase(), true);
    assert.equal(item.quantity, 2);
});

test("decrease takes one off and returns true above 1", () => {
    const item = makeItem({ quantity: 2 });

    assert.equal(item.decrease(), true);
    assert.equal(item.quantity, 1);
});

test("throws when quantity is not a whole number", () => {
    assert.throws(() => makeItem({ quantity: 1.5 }), /Quantity must be a whole number/);
});

test("throws when price is not a number", () => {
    assert.throws(() => makeItem({ price: "abc" }), /Price must be a number/);
});

test("throws when id or name is empty", () => {
    assert.throws(() => makeItem({ id: "" }), /Id must not be empty/);
    assert.throws(() => makeItem({ name: "" }), /Name must not be empty/);
});

test("throws when stock is not a whole number", () => {
    assert.throws(() => makeItem({ stock: 1.5 }), /Stock must be a whole number/);
});
