import { Product } from "./models/product.js";
import { products } from "./data/product.js";

const product = new Product(products[0]);

console.log(product.isTopSelling());
