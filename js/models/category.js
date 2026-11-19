import { Coffee } from "./coffee.js";
import { Tea } from "./tea.js";
import { Bread } from "./bread.js";
import { products } from "../data/product.js";

const productClasses = {
    Coffee,
    Tea,
    Bread,
};

export const ALL_CATEGORIES = "All";

export const SORT = {
    DEFAULT: "default",
    PRICE_HIGH_TO_LOW: "price-htl",
    PRICE_LOW_TO_HIGH: "price-lth",
    RATING: "rating",
    STOCK: "stock",
};

const CATEGORIES = [ALL_CATEGORIES, ...Object.keys(productClasses)];

export class Category {
    #allProducts;

    constructor() {
        this.#allProducts = products.map((product) => {
            const ProductClass = productClasses[product.category];

            if (!ProductClass) {
                throw new Error(`Unknown product category: ${product.category}`);
            }

            return new ProductClass(product);
        });
    }

    findById(id) {
        return this.#allProducts.find((product) => product.id === id);
    }

    getProducts(categoryName, sort) {
        if (!CATEGORIES.includes(categoryName)) {
            throw new Error(`Unknown category: ${categoryName}`);
        }

        if (!Object.values(SORT).includes(sort)) {
            throw new Error(`Invalid sorting property: ${sort}`);
        }

        const list =
            categoryName === ALL_CATEGORIES
                ? [...this.#allProducts]
                : this.#allProducts.filter((product) => product.category === categoryName);

        if (sort === SORT.DEFAULT) {
            return list;
        }
        if (sort === SORT.PRICE_HIGH_TO_LOW) {
            return list.sort((a, b) => b.price - a.price);
        }
        if (sort === SORT.PRICE_LOW_TO_HIGH) {
            return list.sort((a, b) => a.price - b.price);
        }
        return list.sort((a, b) => b[sort] - a[sort]);
    }
}
