import { CartItem } from "./cartItem.js";
import { Product } from "./product.js";

export class Cart {
    #cartItems;

    constructor () {
        this.#cartItems = [];
    }

    findById (id) {
        for (let i = 0; i < this.#cartItems.length; i ++) {
            if (this.#cartItems[i].id === id) {
                return i;
            }
        }
        return -1;
    }
    
    addItem (product) {
        const index = this.findById(product.id);

        if (index === -1) {
            const newItem = new CartItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
            this.#cartItems.push(newItem);
        } else {
            this.#cartItems[index].changeQuantity(false);
        }
    }

    removeItem (id) {
        const before = this.#cartItems.length;
        this.#cartItems = this.#cartItems.filter((item) => item.id !== id);
        return this.#cartItems.length < before;
    }

    get cartItems () {
        return [...this.#cartItems];
    }

    getTotal () {
        let totalPrice = 0;
        for (let i = 0; i < this.#cartItems.length; i ++) {
            totalPrice += this.#cartItems[i].getSubTotal();
        }
        return Math.round(totalPrice * 100) / 100;
    }
    
    getTotalWithDiscount () {
        let totalPrice = 0;
        for (let i = 0; i < this.#cartItems.length; i ++) {
            totalPrice += this.#cartItems[i].getSubTotalWithDiscount();
        }
        return Math.round(totalPrice * 100) / 100;
    }

}
