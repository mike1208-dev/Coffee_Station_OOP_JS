export class CartItem {
    #id;
    #name;
    #price;
    #image;
    #quantity;
    #stock;

    // constructor
    constructor({ id, name, price, image, quantity, stock }) {
        if (price <= 0) {
            throw new Error("Price must be greater than zero.");
        }
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
        if (this.#quantity <= 5) {
            return 1;
        }
        if (this.#quantity <= 10) {
            return 0.9;
        }
        if (this.#quantity <= 15) {
            return 0.8;
        }
        if (this.#quantity <= 20) {
            return 0.7;
        }
        return 0.6;
    }

    increase() {
        this.#quantity++;
    }

    decrease() {
        this.#quantity--;
    }

    getSubTotal() {
        return this.#price * this.#quantity;
    }

    getSubTotalWithDiscount() {
        return this.#price * this.#quantity * this.calcDiscount();
    }
}
