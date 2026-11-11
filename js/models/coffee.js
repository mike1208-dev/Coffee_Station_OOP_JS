import { Product } from "./product.js";

export class Coffee extends Product {
    #temperature; // ice or hot
    #origin;      // Ethiopia, Colombia, Brazil

    constructor ({id, name, category, description, price, image, rating, stock, temperature, origin}) {
        super({id, name, category, description, price, image, rating, stock});

        this.#temperature = temperature;
        this.#origin = origin;
    }

    // getter
    get temperature () { return this.#temperature; }
    get origin () { return this.#origin; }
}