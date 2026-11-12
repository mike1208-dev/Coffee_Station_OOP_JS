import { products } from "../data/product.js";

export const buildProductGrid = (category) => {
    let productGrid = ``;

    for (let i = 0; i < products.length; i ++) {
        if (products[i].category !== category) continue;
        productGrid += `
            <!-- Product Card 1 -->
            <article class="product-card">
                <div class="product-image">
                    <img
                        src="./assets/images/${products[i].image}"
                        alt=${products[i].name}
                    >
                </div>
                <div class="product-info">
                    <div class="product-title-row">
                        <h3>${products[i].name}</h3>
                        <span class="product-rating">★ ${products[i].rating}</span>
                    </div>
                    <p class="product-description">${products[i].description}</p>
                    <div class="product-price">
                        <span class="current-price">$${products[i].price}</span>
                    </div>
                    <button class="add-to-cart-btn">
                        <span>+</span> Add to Cart
                    </button>
                </div>
            </article>`;
    }

    document.getElementById("product-grid").innerHTML = productGrid;

}
