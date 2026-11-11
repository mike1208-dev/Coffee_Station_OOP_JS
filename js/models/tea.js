import { Product } from "./product.js";

export class Tea extends Product {
    #teaType; // Green, , Herbal
    #sweetness; // 0%, 25%, 50%, 100%

    constructor ({id, name, category, description, price, image, rating, stock, teaType, sweetness}) {
        super({id, name, category, description, price, image, rating, stock});

        this.#teaType = teaType;
        this.#sweetness = sweetness;
    }

    get teaType () { return this.#teaType; }
    get sweetness () { return this.#sweetness; }
}