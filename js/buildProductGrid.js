import { escapeHtml } from "./escapeHtml.js";

export const buildProductGrid = (products) =>
    products
        .map(
            (product) => `
            <article class="product-card">
                <div class="product-image">
                    <img
                        src="./assets/images/${escapeHtml(product.image)}"
                        alt="${escapeHtml(product.name)}"
                    >
                </div>
                <div class="product-info">
                    <div class="product-title-row">
                        <h3>${escapeHtml(product.name)}</h3>
                        <span class="product-rating">★ ${escapeHtml(product.rating)}</span>
                    </div>
                    <p class="product-description">${escapeHtml(product.description)}</p>
                    <div class="product-price">
                        <span class="current-price">Price: </span>
                        <span class="current-price">$${escapeHtml(product.price.toFixed(2))}</span>
                        </div>
                    <div>
                        <span class="current-price">Stock: </span>
                        <span class="current-price">${escapeHtml(product.stock)}</span>
                    </div>
                    <button
                        type="button"
                        class="add-to-cart-btn"
                        data-id="${escapeHtml(product.id)}"
                        aria-label="Add to Cart: ${escapeHtml(product.name)}"
                    >
                        <span>+</span> Add to Cart
                    </button>
                </div>
            </article>`
        )
        .join("");
