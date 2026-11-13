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
    
    AddItem (product) {
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
        const index = this.findById(id);

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

const product = new Product({
    id: "c1",
    name: "Classic Latte",
    category: "Coffee",
    description: "Rich espresso with steamed milk and a light layer of foam.",
    price: 4.50,
    image: "coffee (1)",
    rating: 4.8,
    stock: 12
});
const product2 = new Product({
    id: "c2",
    name: "Classic Latte",
    category: "Coffee",
    description: "Rich espresso with steamed milk and a light layer of foam.",
    price: 4.50,
    image: "coffee (1)",
    rating: 4.8,
    stock: 12
});