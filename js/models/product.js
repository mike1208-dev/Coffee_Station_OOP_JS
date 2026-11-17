import { requireNumber, requireText, requireWholeNumber } from "../validators.js"; 

export class Product {
    #id;
    #name;
    #category;
    #description;
    #price;
    #image;
    #rating;
    #stock;

    // constructor
    constructor({ id, name, category, description, price, image, rating, stock }) {
        requireText(id, "Id");
        requireText(name, "Name");
        requireNumber(price, "Price");
        if (price <= 0) {
            throw new Error("Price must be greater than zero.");
        }
        requireNumber(rating, "Rating");
        if (rating < 0 || rating > 5) {
            throw new Error("Rating must be between 0 and 5.");
        }
        requireWholeNumber(stock, "Stock");
        if (stock < 0) {
            throw new Error("Stock cannot be negative.");
        }

        this.#id = id;
        this.#name = name;
        this.#category = category;
        this.#description = description;
        this.#price = price;
        this.#image = image;
        this.#rating = rating;
        this.#stock = stock;
    }

    // getter
    get id() {
        return this.#id;
    }
    get name() {
        return this.#name;
    }
    get category() {
        return this.#category;
    }
    get description() {
        return this.#description;
    }
    get price() {
        return this.#price;
    }
    get image() {
        return this.#image;
    }
    get rating() {
        return this.#rating;
    }
    get stock() {
        return this.#stock;
    }

    isTopSelling() {
        if (this.rating >= 4.9) {
            return true;
        }
        return false;
    }

    checkStock() {
        if (this.stock > 0) {
            return true;
        }
        return false;
    }
}
