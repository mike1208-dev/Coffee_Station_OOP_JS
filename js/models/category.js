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
    #products;
    #allProducts;
    #nowSortState;
    #nowCategory;

    constructor() {
        this.#allProducts = products.map((product) => {
            const ProductClass = productClasses[product.category];

            if (!ProductClass) {
                throw new Error(`Unknown product category: ${product.category}`);
            }

            return new ProductClass(product);
        });

        this.#products = this.#allProducts;
        this.#nowSortState = SORT.DEFAULT;
        this.#nowCategory = ALL_CATEGORIES;
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

    filterByCategory(category) {
        if (category === ALL_CATEGORIES) {
            this.#products = this.#allProducts;
        } else {
            this.#products = this.#allProducts.filter((product) => product.category === category);
        }

        this.#nowCategory = category;
        this.#products = this.sortBy(this.#nowSortState);

        return [...this.#products];
    }

    sortBy(property) {
        const allowedProperties = Object.values(SORT);

        if (!allowedProperties.includes(property)) {
            throw new Error(`Invalid sorting property: ${property}`);
        }

        this.#nowSortState = property;

        if (property === SORT.DEFAULT) {
            if (this.#nowCategory === ALL_CATEGORIES) {
                this.#products = this.#allProducts;
            } else {
                this.#products = this.#allProducts.filter(
                    (product) => product.category === this.#nowCategory
                );
            }
        }

        return [...this.#products].sort((a, b) => {
            if (property === SORT.PRICE_HIGH_TO_LOW) {
                return b["price"] - a["price"];
            }
            if (property === SORT.PRICE_LOW_TO_HIGH) {
                return a["price"] - b["price"];
            }
            return b[property] - a[property];
        });
    }
}
