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
    
    AddItem (product) {
        const index = this.findIndexById(product.id);

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
        const index = this.findIndexById(id);

        if (index === -1) {
            console.log("Can't find this item!");
            return;
        }
        this.#cartItems = this.#cartItems.filter((item, i) => i !== index);
    }

    get cartItems () {
        return [...this.#cartItems];
    }

    getTotal () {
        let totalPrice = 0;
        for (let i = 0; i < this.#cartItems.length; i ++) {
            totalPrice += this.#cartItems[i].getSubTotal();
        }
        return totalPrice;
    }
    
    getTotalWithDiscount () {
        let totalPrice = 0;
        for (let i = 0; i < this.#cartItems.length; i ++) {
            totalPrice += this.#cartItems[i].getSubTotalWithDiscount();
        }
        return totalPrice;
    }

}
