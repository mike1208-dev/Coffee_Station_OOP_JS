export const buildCartItemsGrid = (cartItems) => {
    let cartItemsGrid = ``;
    for (let i = 0; i < cartItems.length; i ++) {
        cartItemsGrid += `
            <article class="cart-item">
                <img
                    class="cart-item-image"
                    src="./assets/images/${cartItems[i].image}"
                    alt="${cartItems[i].name}"
                >
                <div class="cart-item-info">
                    <h3>${cartItems[i].name}</h3>
                    <p class="cart-item-price">$${cartItems[i].price.toFixed(2)} each</p>
                    <div class="cart-item-controls">
                        <div class="quantity-control">
                            <button class="quantity-btn" data-action="decrease" data-id="${cartItems[i].id}">−</button>
                            <span class="quantity-value">${cartItems[i].quantity}</span>
                            <button class="quantity-btn" data-action="increase" data-id="${cartItems[i].id}">+</button>
                        </div>
                        <button class="remove-item-btn" data-id="${cartItems[i].id}">
                            Remove
                        </button>
                    </div>
                </div>
                <span class="cart-item-subtotal">$${cartItems[i].getSubTotal().toFixed(2)}</span>
            </article>`;
    }
    document.getElementById("cart-items").innerHTML = cartItemsGrid;
    document.getElementById("cart-count").innerHTML = cartItems.length;
}
