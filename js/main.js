import { buildProductGrid } from "./buildProductGrid.js";
import { Category } from "./models/category.js";

const category = new Category();

const buttons = document.querySelectorAll(".category-btn");
const sortSelect = document.getElementById("sort-products");

let activeCategory = "All";

const renderProducts = () => {

    let products = sortSelect.value
        ? category.sortBy(sortSelect.value)
        : category.products;

    if (activeCategory !== "All") {
        products = products.filter(
            product => product.category === activeCategory
        );
    }

    buildProductGrid(products);
};

buttons.forEach(button => {

    button.addEventListener("click", () => {

        activeCategory = button.dataset.category;

        buttons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        renderProducts();
    });

});

sortSelect.addEventListener("change", () => {
    renderProducts();
});

renderProducts();
