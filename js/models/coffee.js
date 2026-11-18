import { Product } from "./product.js";

export class Coffee extends Product {
    #temperature; // ice or hot
    #origin; // Ethiopia, Colombia, Brazil

    constructor({ temperature, origin, ...product }) {
        super(product);

        this.#temperature = temperature;
        this.#origin = origin;
    }

    // getter
    get temperature() {
        return this.#temperature;
    }
    get origin() {
        return this.#origin;
    }
}
