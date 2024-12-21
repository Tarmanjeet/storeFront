document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products');
    const searchBar = document.getElementById('search-bar');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartSection = document.getElementById('cart-section');
    const cartButton = document.getElementById('cart-button');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    let products = JSON.parse(localStorage.getItem('products')) || [];

    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const saveProducts = () => {
        localStorage.setItem('products', JSON.stringify(products));
    };

    const renderProducts = () => {
        productsContainer.innerHTML = '';
        products.forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p><strong>Rs.${product.price}</strong></p>
                <p><strong>${product.quantity} Remaining</strong></p>
                <button onclick="addToCart(${index})">Add to Cart</button>
            `;
            productsContainer.appendChild(productCard);
        });
    };

    const renderCart = () => {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;
        cart.forEach((cartItem) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <p>${cartItem.name}</p>
                <p>Rs.${cartItem.price}</p>
            `;
            cartItemsContainer.appendChild(cartItemElement);
            totalPrice += parseFloat(cartItem.price);
        });
        totalPriceElement.textContent = `Total Price: Rs.${totalPrice.toFixed(2)}`;
    };

    const addToCart = (index) => { 
        const product = products[index]; 
        if (product.quantity > 0) { 
            const cartProduct = { ...product,cartId: Date.now(), quantity: 1 
            }; 
            const existingProductIndex = cart.findIndex(item => item.name === product.name); 
            if (existingProductIndex !== -1) { 
                cart[existingProductIndex].quantity += 1; 
            } else { 
                cart.push(cartProduct); 
            } 
            product.quantity -= 1; 
            saveCart(); 
            saveProducts(); 
            renderProducts(); 
        } 
        else { 
            alert("Product is out of stock!"); 
        } 
    }; 

    searchBar.addEventListener('input', () => { const searchTerm = searchBar.value.toLowerCase(); const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm)); renderProducts(filteredProducts); if (searchTerm) { productsContainer.scrollIntoView({ behavior: 'smooth' }); } });

    window.addToCart = addToCart;

    renderProducts();
    renderCart();
});
