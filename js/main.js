import { buildProductGrid } from "./buildProductGrid.js";
import { buildCartItemsGrid } from "./buildCartItemsGrid.js";
import { Category, ALL_CATEGORIES } from "./models/category.js";
import { Cart } from "./models/cart.js";

// Category Management

const category = new Category();

const buttons = document.querySelectorAll(".category-btn");
const sortSelect = document.getElementById("sort-products");
const productGrid = document.getElementById("product-grid");

let activeCategory = ALL_CATEGORIES;

const renderProducts = () => {
    const products = category.getProducts(activeCategory, sortSelect.value);
    productGrid.innerHTML = buildProductGrid(products);
};

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        activeCategory = button.dataset.category;

        buttons.forEach((btn) => {
            btn.classList.remove("active");
            btn.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        renderProducts();
    });
});

sortSelect.addEventListener("change", () => {
    renderProducts();
});

renderProducts();

// Cart Management

const cart = new Cart();

const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartCountLetter = document.getElementById("cart-count-letter");

const setTextIfChanged = (element, text) => {
    if (element.textContent !== text) {
        element.textContent = text;
    }
};

const renderCart = () => {
    const total = cart.getTotal();
    const totalWithDiscount = cart.getTotalWithDiscount();
    const items = cart.cartItems;

    cartItems.innerHTML = buildCartItemsGrid(items);
    setTextIfChanged(cartCount, String(items.length));
    setTextIfChanged(
        cartCountLetter,
        items.length === 1 ? "item in your cart" : "items in your cart"
    );
    document.getElementById("subtotal").textContent = `$${total.toFixed(2)}`;
    document.getElementById("discount").textContent = `-$${(total - totalWithDiscount).toFixed(2)}`;
    document.getElementById("total").textContent = `$${totalWithDiscount.toFixed(2)}`;
};

productGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".add-to-cart-btn");
    if (!button) {
        return;
    }

    if (!cart.addItem(category.findById(button.dataset.id))) {
        alert("Not enough stock!");
    }
    renderCart();
});

const restoreFocus = (usedButton) => {
    const selector = usedButton.classList.contains("quantity-btn")
        ? `.quantity-btn[data-action="${usedButton.dataset.action}"][data-id="${usedButton.dataset.id}"]`
        : `.remove-item-btn[data-id="${usedButton.dataset.id}"]`;
    const sameButton = cartItems.querySelector(selector) ?? cartItems.querySelector("button");
    sameButton?.focus();
};

cartItems.addEventListener("click", (event) => {
    const removeBtn = event.target.closest(".remove-item-btn");
    const ctrlBtn = event.target.closest(".quantity-btn");
    if (removeBtn) {
        cart.removeItem(removeBtn.dataset.id);
    } else if (ctrlBtn) {
        if (ctrlBtn.dataset.action === "increase") {
            const result = cart.increase(ctrlBtn.dataset.id);
            if (result === false) {
                alert("Not enough stock!");
            }
        } else {
            cart.decrease(ctrlBtn.dataset.id);
        }
    }

    renderCart();

    if (removeBtn || ctrlBtn) {
        restoreFocus(removeBtn ?? ctrlBtn);
    }
});
