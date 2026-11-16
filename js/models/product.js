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
        if (this.rating >= 4.9) {return true;}
        return false;
    }

    checkStock () {
        if (this.stock > 0) {return true;}
        return false;
    }

}
