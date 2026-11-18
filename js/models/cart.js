import { CartItem } from "./cartItem.js";

export class Cart {
    #cartItems;

    constructor() {
        this.#cartItems = [];
    }

    findIndexById(id) {
        return this.#cartItems.findIndex((item) => item.id === id);
    }

    addItem(product) {
        const index = this.findIndexById(product.id);
        const quantityInCart = index === -1 ? 0 : this.#cartItems[index].quantity;

        if (product.stock === 0) {
            return false;
        }

        if (quantityInCart >= product.stock) {
            return false;
        }

        if (index === -1) {
            this.#cartItems.push(
                new CartItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                    stock: product.stock,
                })
            );
        } else {
            this.#cartItems[index].increase();
        }
        return true;
    }

    removeItem(id) {
        const before = this.#cartItems.length;
        this.#cartItems = this.#cartItems.filter((item) => item.id !== id);
        return this.#cartItems.length < before;
    }

    get cartItems() {
        return [...this.#cartItems];
    }

    increase(id) {
        const index = this.findIndexById(id);
        if (index === -1) {
            return false;
        }
        const item = this.#cartItems[index];
        return item.increase();
    }

    decrease(id) {
        const index = this.findIndexById(id);
        if (index === -1) {
            return false;
        }
        const item = this.#cartItems[index];
        if (item.quantity === 1) {
            this.removeItem(id);
        } else {
            item.decrease();
        }
        return true;
    }

    getTotal() {
        const totalPrice = this.#cartItems.reduce((sum, item) => sum + item.getSubTotal(), 0);
        return Math.round(totalPrice * 100) / 100;
    }

    getTotalWithDiscount() {
        const totalPrice = this.#cartItems.reduce(
            (sum, item) => sum + item.getSubTotalWithDiscount(),
            0
        );
        return Math.round(totalPrice * 100) / 100;
    }
}
