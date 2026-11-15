import { buildProductGrid } from "./buildProductGrid.js";
import { buildCartItemsGrid } from "./buildCartItemsGrid.js";
import { Category } from "./models/category.js";
import { Cart } from "./models/cart.js";

// Category Management

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


// Cart Management

const cart = new Cart();

const renderCart = () => {
    const total = cart.getTotal();
    const totalWithDiscount = cart.getTotalWithDiscount();

    buildCartItemsGrid(cart.cartItems);
    document.getElementById("subtotal").textContent = `$${total.toFixed(2)}`;
    document.getElementById("discount").textContent = `-$${(total - totalWithDiscount).toFixed(2)}`;
    document.getElementById("total").textContent = `$${totalWithDiscount.toFixed(2)}`;
};

const productGrid = document.getElementById("product-grid");

productGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".add-to-cart-btn");
    if (!button) return;

    cart.addItem(category.findById(button.dataset.id));
    renderCart();
});

const cartItems = document.getElementById("cart-items");

cartItems.addEventListener("click", (event) => {
    const removeBtn = event.target.closest(".remove-item-btn");
    const ctrlBtn = event.target.closest(".quantity-btn");
    if (removeBtn) {
        cart.removeItem(removeBtn.dataset.id);
    } else if (ctrlBtn) {
        cart.changeQuantity(ctrlBtn.dataset.id, ctrlBtn.dataset.action);
    }
    
    renderCart();

});
