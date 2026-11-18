import { escapeHtml } from "./escapeHtml.js";

export const buildProductGrid = (products) => {
    let productGrid = ``;

    for (let i = 0; i < products.length; i++) {
        productGrid += `
            <article class="product-card">
                <div class="product-image">
                    <img
                        src="./assets/images/${escapeHtml(products[i].image)}"
                        alt="${escapeHtml(products[i].name)}"
                    >
                </div>
                <div class="product-info">
                    <div class="product-title-row">
                        <h3>${escapeHtml(products[i].name)}</h3>
                        <span class="product-rating">★ ${escapeHtml(products[i].rating)}</span>
                    </div>
                    <p class="product-description">${escapeHtml(products[i].description)}</p>
                    <div class="product-price">
                        <span class="current-price">Price: </span>
                        <span class="current-price">$${escapeHtml(products[i].price.toFixed(2))}</span>
                        </div>
                    <div>
                        <span class="current-price">Stock: </span>
                        <span class="current-price">${escapeHtml(products[i].stock)}</span>
                    </div>
                    <button
                        type="button"
                        class="add-to-cart-btn"
                        data-id="${escapeHtml(products[i].id)}"
                        aria-label="Add to Cart: ${escapeHtml(products[i].name)}"
                    >
                        <span>+</span> Add to Cart
                    </button>
                </div>
            </article>`;
    }

    document.getElementById("product-grid").innerHTML = productGrid;
};
