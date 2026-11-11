export class Product {
    #id; #name; #category; #description;
    #price; #image; #rating; #stock;

    // constructor
    constructor ({id, name, category, description, price, image, rating, stock}) {

        if (price <= 0) { throw new Error("Price must be greater than zero."); }
        if (stock < 0) { throw new Error("Storae must be greater than zero."); }

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
    get id () { return this.#id; }
    get name () { return this.#name; }
    get category () { return this.#category; }
    get description () { return this.#description; }
    get price () { return this.#price; }
    get image () { return this.#image; }
    get rating () { return this.#rating; }
    get stock () { return this.#stock; }

    isTopSelling () {
        if (this.rating >= 4.9) return true;
        return false;
    }

    checkStock () {
        if (this.stock > 0) return true;
        return false;
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
