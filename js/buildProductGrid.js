export const buildProductGrid = (products) => {
    let productGrid = ``;
    
    for (let i = 0; i < products.length; i ++) {
        productGrid += `
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
                        <span class="current-price">Price: </span>
                        <span class="current-price">$${products[i].price}</span>
                        </div>
                    <div>
                        <span class="current-price">Stock: </span>
                        <span class="current-price">${products[i].stock}</span>
                    </div>
                    <button class="add-to-cart-btn">
                        <span>+</span> Add to Cart
                    </button>
                </div>
            </article>`;
    }

    document.getElementById("product-grid").innerHTML = productGrid;

}
