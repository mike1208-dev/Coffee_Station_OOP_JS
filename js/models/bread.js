import { Product } from "./product.js";

export class Bread extends Product {
    #breadType; // Croissant, Baguette, Sourdough
    #freshness; // Freshly baked, Frozen

    constructor ({id, name, category, description, price, image, rating, stock, breadType, freshness}) {
        super({id, name, category, description, price, image, rating, stock});

        this.#breadType = breadType;
        this.#freshness = freshness;
    }

    get breadType () { return this.#breadType; }
    get freshness () { return this.#freshness; }
}