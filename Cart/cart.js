document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const addressForm = document.getElementById('address-form');
    const buyNowButton = document.getElementById('buy-now-button');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let products = JSON.parse(localStorage.getItem('products')) || [];

    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const saveProducts = () => { localStorage.setItem('products', JSON.stringify(products)); };

    const renderCart = () => {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;
        cart = cart.filter(cartItem => cartItem.quantity > 0); 
        cart.forEach((cartItem, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <p>${cartItem.name}</p>
                <p>Rs.${cartItem.price}</p>
                <p>Quantity: ${cartItem.quantity}</p>
                <button onclick="decreaseQuantity(${index})">Decrease Quantity</button>
            `;
            cartItemsContainer.appendChild(cartItemElement);
            totalPrice += parseFloat(cartItem.price) * cartItem.quantity;
        });
        totalPriceElement.textContent = `Total Price: Rs.${totalPrice.toFixed(2)}`;
    };

    const decreaseQuantity = (index) => {
        const cartItem = cart[index];
        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
        } else {
            cart.splice(index, 1); 
        }
        saveCart();
        saveProducts
        renderCart();
    };
    
    const buyNow = () => {
        addressForm.style.display = 'block';
        addressForm.onsubmit = (event) => {
            event.preventDefault();
            const fullName = document.getElementById('full-name').value;
            const address = document.getElementById('address').value;
            const city = document.getElementById('city').value;
            const state = document.getElementById('state').value;
            const zipCode = document.getElementById('zip-code').value;
    
            alert(`Order Confirmed!\n\nName: ${fullName}\nAddress: ${address}, ${city}, ${state} - ${zipCode}\n\nCash on Delivery`);

            cart.forEach(cartItem => { 
                const product = products.find(p => p.name === cartItem.name); 
                if (product) { product.quantity -= cartItem.quantity; } 
            });
    
            cart = [];
            saveCart();
            saveProducts();
            renderCart();
            addressForm.reset();
            addressForm.style.display = 'none';
        };
    };
    window.decreaseQuantity = decreaseQuantity;
    window.buyNow = buyNow;

    buyNowButton.addEventListener('click', buyNow);
    
    renderCart();
});
