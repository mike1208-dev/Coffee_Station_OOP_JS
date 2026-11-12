
import { Coffee } from "./coffee.js";
import { Tea } from "./tea.js";
import { Bread } from "./bread.js";
import { products } from "../data/product.js";

const productClasses = {
    Coffee,
    Tea,
    Bread
};

export class Category {
    #products;
    #allProducts;
    #nowSortState;

    constructor() {
        this.#allProducts = products.map(product => {
            const ProductClass = productClasses[product.category];

            if (!ProductClass) {
                throw new Error(
                    `Unknown product category: ${product.category}`
                );
            }

            return new ProductClass(product);
        });
        this.#products = this.#allProducts;
        this.#nowSortState = "default";
    }

    get products() {
        return [...this.#products];
    }

    filterByCategory(category) {
        if (category === "All") this.#products = this.#allProducts;
        else this.#products = this.#allProducts.filter(
            product => product.category === category
        );

        this.#products = this.sortBy(this.#nowSortState);

        return [...this.#products];
    }

    sortBy(property) {
        const allowedProperties = ["default", "price-htl", "price-lth", "rating", "stock"];

        if (!allowedProperties.includes(property)) {
            throw new Error(`Invalid sorting property: ${property}`);
        }
        
        this.#nowSortState = property;

        return [...this.#products].sort((a, b) => {
            if (property === "price-htl") return b["price"] - a["price"];
            if (property === "price-lth") return a["price"] - b["price"];
            return b[property] - a[property];
        });
    }
}
