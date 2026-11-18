import { test } from "node:test";
import assert from "node:assert/strict";
import { Cart } from "../js/models/cart.js";

const makeProduct = (changes) => ({
    id: "c1",
    name: "Latte",
    price: 10,
    image: "x.avif",
    stock: 3,
    ...changes,
});

test("addItem puts a new product in the cart with quantity 1", () => {
    const cart = new Cart();

    const result = cart.addItem(makeProduct());

    assert.equal(result, true);
    assert.equal(cart.cartItems.length, 1);
    assert.equal(cart.cartItems[0].quantity, 1);
});

test("addItem twice increases quantity instead of adding a new row", () => {
    const cart = new Cart();

    cart.addItem(makeProduct());
    cart.addItem(makeProduct());

    assert.equal(cart.cartItems.length, 1);
    assert.equal(cart.cartItems[0].quantity, 2);
});

test("addItem returns false at the stock limit", () => {
    const cart = new Cart();

    cart.addItem(makeProduct());
    cart.addItem(makeProduct());
    cart.addItem(makeProduct());
    const result = cart.addItem(makeProduct());

    assert.equal(result, false);
    assert.equal(cart.cartItems[0].quantity, 3);
});

test("addItem returns false when stock is 0", () => {
    const cart = new Cart();

    const result = cart.addItem(makeProduct({ stock: 0 }));

    assert.equal(result, false);
    assert.equal(cart.cartItems.length, 0);
});

test("removeItem removes the item and returns true", () => {
    const cart = new Cart();

    cart.addItem(makeProduct());

    assert.equal(cart.removeItem(cart.cartItems[0].id), true);
    assert.equal(cart.cartItems.length, 0);
});

test("removeItem returns false for an unknown id", () => {
    const cart = new Cart();

    cart.addItem(makeProduct());

    assert.equal(cart.removeItem("unknown"), false);
    assert.equal(cart.cartItems.length, 1);
});

test("increase adds 1", () => {
    const cart = new Cart();

    cart.addItem(makeProduct());
    const result = cart.increase("c1");

    assert.equal(result, true);
    assert.equal(cart.cartItems[0].quantity, 2);
});

test("increase stops at stock", () => {
    const cart = new Cart();

    cart.addItem(makeProduct());
    cart.increase("c1");
    cart.increase("c1");
    const result = cart.increase("c1");

    assert.equal(result, false);
    assert.equal(cart.cartItems[0].quantity, 3);
});

test("decrease at quantity 1 removes the item", () => {
    const cart = new Cart();

    cart.addItem(makeProduct());
    const result = cart.decrease("c1");

    assert.equal(result, true);
    assert.equal(cart.cartItems.length, 0);
});

test("decrease subtracts 1", () => {
    const cart = new Cart();

    cart.addItem(makeProduct());
    cart.addItem(makeProduct());
    const result = cart.decrease("c1");

    assert.equal(result, true);
    assert.equal(cart.cartItems.length, 1);
    assert.equal(cart.cartItems[0].quantity, 1);
});

test("increase returns false for an unknown id", () => {
    const cart = new Cart();

    cart.addItem(makeProduct());
    const result = cart.increase("unknown");

    assert.equal(result, false);
    assert.equal(cart.cartItems[0].quantity, 1);
});

test("decrease returns false for an unknown id", () => {
    const cart = new Cart();

    cart.addItem(makeProduct());
    const result = cart.decrease("unknown");

    assert.equal(result, false);
    assert.equal(cart.cartItems[0].quantity, 1);
});

test("getTotal adds up all items", () => {
    const cart = new Cart();

    cart.addItem(makeProduct({ id: "a", price: 10 }));
    cart.addItem(makeProduct({ id: "a", price: 10 }));
    cart.addItem(makeProduct({ id: "b", price: 5 }));

    assert.equal(cart.getTotal(), 25);
});

test("getTotalWithDiscount applies the discount tier", () => {
    const cart = new Cart();
    const product = makeProduct({ stock: 10 });

    for (let i = 0; i < 6; i++) {
        cart.addItem(product);
    }

    assert.equal(cart.getTotalWithDiscount(), 54);
});
