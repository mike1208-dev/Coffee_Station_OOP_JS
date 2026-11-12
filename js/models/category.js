
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
    }

    get products() {
        return [...this.#products];
    }

    filterByCategory(category) {
        if (category === "All") this.#products = this.#allProducts;
        else this.#products = this.#allProducts.filter(
            product => product.category === category
        );
        return [...this.#products];
    }

    sortBy(property) {
        const allowedProperties = ["default", "price", "rating", "stock"];

        if (!allowedProperties.includes(property)) {
            throw new Error(`Invalid sorting property: ${property}`);
        }
        
        return [...this.#products].sort((a, b) => {
            return a[property] - b[property];
        });
    }
}
