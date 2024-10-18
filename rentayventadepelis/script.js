let cart = {};

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));

        if (cart[name]) {
            cart[name].quantity++;
        } else {
            cart[name] = { price: price, quantity: 1 };
        }
        updateCart();
    });
});

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    let total = 0;

    for (const [name, { price, quantity }] of Object.entries(cart)) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="py-2">${name}</td>
            <td class="py-2">$${price.toFixed(2)}</td>
            <td class="py-2">${quantity}</td>
            <td class="py-2">$${(price * quantity).toFixed(2)}</td>
            <td class="py-2">
                <button class="remove-item bg-red-500 text-white p-1 rounded" data-name="${name}">X</button>
            </td>
        `;
        cartItems.appendChild(row);
        total += price * quantity;
    }

    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            delete cart[name];
            updateCart();
        });
    });

    const emptyCartButton = document.getElementById('empty-cart');
    emptyCartButton.addEventListener('click', () => {
        cart = {};
        updateCart();
    });
}

updateCart();
