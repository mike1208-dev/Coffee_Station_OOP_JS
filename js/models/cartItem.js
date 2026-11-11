export class CartItem {
    #id; #name; #price; #image; #quantity;

    // constructor
    constructor ({id, name, price, image, quantity}) {
        
        if (price <= 0) { throw new Error("Price must be greater than zero."); }
        if (quantity <= 0) { throw new Error("Quantity must be greater than zero."); }

        this.#id = id;
        this.#name = name;
        this.#price = price;
        this.#image = image;
        this.#quantity = quantity;

    }

    // getter
    get id () { return this.#id; }
    get name () { return this.#name; }
    get price () { return this.#price; }
    get image () { return this.#image; }
    get quantity () { return this.#quantity; }
    
    calcDiscount () {
        if (this.#quantity <= 5) return 1;
        if (this.#quantity <= 10) return 0.9;
        if (this.#quantity <= 15) return 0.8;
        if (this.#quantity <= 20) return 0.7;
        return 0.6;
    }
    
    changeQuantity (x) {
        if (x == true) this.#quantity --;
        else this.#quantity ++;
    }

    getSubTotal () {
        return this.#price * this.#quantity;
    }
    
    getSubTotalWithDiscount () {
        return this.#price * this.#quantity * this.calcDiscount();
    }

}

const cartItem = new CartItem({
    id: "c1",
    name: "Classic Latte",
    price: 4.50,
    image: "coffee (1)",
    quantity: 10
})

console.log(cartItem.getSubTotal());
