import {buildProductGrid} from "./models/buildProductGrid.js";
import { Category } from "./models/category.js";

const category = new Category();

buildProductGrid(category.products);

const categoryList = ["All", "Coffee", "Tea", "Bread"];

const clickCategory = (index) => {
    const products = category.filterByCategory(categoryList[index]);
    buildProductGrid(products);
}

const buttons = document.querySelectorAll(".category-btn");

buttons.forEach((button, index) => {
    button.addEventListener("click", () => clickCategory(index));
});

