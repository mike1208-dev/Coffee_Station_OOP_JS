import { CartItem } from "./cartItem.js";

export class Cart {
    #cartItems;

    constructor () {
        this.#cartItems = [];
    }

    findIndexById (id) {
        for (let i = 0; i < this.#cartItems.length; i ++) {
            if (this.#cartItems[i].id === id) {
                return i;
            }
        }
        return -1;
    }
    
    addItem (product) {
        const index = this.findIndexById(product.id);
        const quantityInCart = index === -1 ? 0 : this.#cartItems[index].quantity;

        if (quantityInCart >= product.stock) return false;

        if (index === -1) {
            this.#cartItems.push(new CartItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            }));
        } else {
            this.#cartItems[index].changeQuantity(false);
        }
        return true;
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
