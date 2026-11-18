import { escapeHtml } from "./escapeHtml.js";

const setTextIfChanged = (id, text) => {
    const element = document.getElementById(id);
    if (element.textContent !== text) {
        element.textContent = text;
    }
};

export const buildCartItemsGrid = (cartItems) => {
    let cartItemsGrid = ``;
    for (let i = 0; i < cartItems.length; i++) {
        cartItemsGrid += `
            <article class="cart-item">
                <img
                    class="cart-item-image"
                    src="./assets/images/${escapeHtml(cartItems[i].image)}"
                    alt="${escapeHtml(cartItems[i].name)}"
                >
                <div class="cart-item-info">
                    <h3>${escapeHtml(cartItems[i].name)}</h3>
                    <p class="cart-item-price">$${escapeHtml(cartItems[i].price.toFixed(2))} each</p>
                    <div class="cart-item-controls">
                        <div class="quantity-control">
                            <button type="button" class="quantity-btn" data-action="decrease" data-id="${escapeHtml(cartItems[i].id)}"
                                aria-label="Decrease ${escapeHtml(cartItems[i].name)}">−</button>
                            <span class="quantity-value">${escapeHtml(cartItems[i].quantity)}</span>
                            <button type="button" class="quantity-btn" data-action="increase" data-id="${escapeHtml(cartItems[i].id)}"
                                aria-label="Increase ${escapeHtml(cartItems[i].name)}">+</button>
                        </div>
                        <button
                            type="button"
                            class="remove-item-btn"
                            data-id="${escapeHtml(cartItems[i].id)}"
                            aria-label="Remove ${escapeHtml(cartItems[i].name)} from cart"
                        >
                            Remove
                        </button>
                    </div>
                </div>
                <span class="cart-item-subtotal">$${escapeHtml(cartItems[i].getSubTotal().toFixed(2))}</span>
            </article>`;
    }
    document.getElementById("cart-items").innerHTML = cartItemsGrid;

    setTextIfChanged("cart-count", String(cartItems.length));
    setTextIfChanged(
        "cart-count-letter",
        cartItems.length === 1 ? "item in your cart" : "items in your cart"
    );
};
