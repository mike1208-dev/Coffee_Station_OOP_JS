import { escapeHtml } from "./escapeHtml.js";

export const buildCartItemsGrid = (cartItems) =>
    cartItems
        .map(
            (item) => `
            <article class="cart-item">
                <img
                    class="cart-item-image"
                    src="./assets/images/${escapeHtml(item.image)}"
                    alt="${escapeHtml(item.name)}"
                >
                <div class="cart-item-info">
                    <h3>${escapeHtml(item.name)}</h3>
                    <p class="cart-item-price">$${escapeHtml(item.price.toFixed(2))} each</p>
                    <div class="cart-item-controls">
                        <div class="quantity-control">
                            <button type="button" class="quantity-btn" data-action="decrease" data-id="${escapeHtml(item.id)}"
                                aria-label="Decrease ${escapeHtml(item.name)}">−</button>
                            <span class="quantity-value">${escapeHtml(item.quantity)}</span>
                            <button type="button" class="quantity-btn" data-action="increase" data-id="${escapeHtml(item.id)}"
                                aria-label="Increase ${escapeHtml(item.name)}">+</button>
                        </div>
                        <button
                            type="button"
                            class="remove-item-btn"
                            data-id="${escapeHtml(item.id)}"
                            aria-label="Remove ${escapeHtml(item.name)} from cart"
                        >
                            Remove
                        </button>
                    </div>
                </div>
                <span class="cart-item-subtotal">$${escapeHtml(item.getSubTotal().toFixed(2))}</span>
            </article>`
        )
        .join("");
