import { Product } from "./product.js";

export class Tea extends Product {
    #teaType; // Green, Black, Herbal
    #sweetness; // 0%, 25%, 50%, 100%

    constructor({ teaType, sweetness, ...product }) {
        super(product);

        this.#teaType = teaType;
        this.#sweetness = sweetness;
    }

    get teaType() {
        return this.#teaType;
    }
    get sweetness() {
        return this.#sweetness;
    }
}
