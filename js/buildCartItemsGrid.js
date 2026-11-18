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
                    src="./assets/images/${cartItems[i].image}"
                    alt="${cartItems[i].name}"
                >
                <div class="cart-item-info">
                    <h3>${cartItems[i].name}</h3>
                    <p class="cart-item-price">$${cartItems[i].price.toFixed(2)} each</p>
                    <div class="cart-item-controls">
                        <div class="quantity-control">
                            <button type="button" class="quantity-btn" data-action="decrease" data-id="${cartItems[i].id}"
                                aria-label="Decrease ${cartItems[i].name}">−</button>
                            <span class="quantity-value">${cartItems[i].quantity}</span>
                            <button type="button" class="quantity-btn" data-action="increase" data-id="${cartItems[i].id}"
                                aria-label="Increase ${cartItems[i].name}">+</button>
                        </div>
                        <button
                            type="button"
                            class="remove-item-btn"
                            data-id="${cartItems[i].id}"
                            aria-label="Remove ${cartItems[i].name} from cart"
                        >
                            Remove
                        </button>
                    </div>
                </div>
                <span class="cart-item-subtotal">$${cartItems[i].getSubTotal().toFixed(2)}</span>
            </article>`;
    }
    document.getElementById("cart-items").innerHTML = cartItemsGrid;

    setTextIfChanged("cart-count", String(cartItems.length));
    setTextIfChanged(
        "cart-count-letter",
        cartItems.length === 1 ? "item in your cart" : "items in your cart"
    );
};
