import { requireNumber, requireText, requireWholeNumber } from "../validators.js";

const DISCOUNT_TIERS = [
    { max: 5, rate: 1 },
    { max: 10, rate: 0.9 },
    { max: 15, rate: 0.8 },
    { max: 20, rate: 0.7 },
    { max: Infinity, rate: 0.6 },
];

export class CartItem {
    #id;
    #name;
    #price;
    #image;
    #quantity;
    #stock;

    // constructor
    constructor({ id, name, price, image, quantity, stock }) {
        requireText(id, "Id");
        requireText(name, "Name");
        requireNumber(price, "Price");
        if (price <= 0) {
            throw new Error("Price must be greater than zero.");
        }
        requireWholeNumber(quantity, "Quantity");
        requireWholeNumber(stock, "Stock");
        if (quantity <= 0) {
            throw new Error("Quantity must be greater than zero.");
        }
        if (quantity > stock) {
            throw new Error("Quantity cannot be more than stock.");
        }

        this.#id = id;
        this.#name = name;
        this.#price = price;
        this.#image = image;
        this.#quantity = quantity;
        this.#stock = stock;
    }

    // getter
    get id() {
        return this.#id;
    }
    get name() {
        return this.#name;
    }
    get price() {
        return this.#price;
    }
    get image() {
        return this.#image;
    }
    get quantity() {
        return this.#quantity;
    }
    get stock() {
        return this.#stock;
    }

    calcDiscount() {
        const tier = DISCOUNT_TIERS.find((t) => this.#quantity <= t.max);
        return tier.rate;
    }

    increase() {
        if (this.#quantity >= this.#stock) {
            return false;
        }
        this.#quantity++;
        return true;
    }

    decrease() {
        if (this.#quantity <= 1) {
            return false;
        }
        this.#quantity--;
        return true;
    }

    getSubTotal() {
        return this.#price * this.#quantity;
    }

    getSubTotalWithDiscount() {
        return this.getSubTotal() * this.calcDiscount();
    }
}
