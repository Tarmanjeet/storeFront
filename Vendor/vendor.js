
document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productsContainer = document.getElementById('products');

    let products = JSON.parse(localStorage.getItem('products')) || [];

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
                <button onclick="editProduct(${index})">Edit</button>
                <button onclick="deleteProduct(${index})">Delete</button>
            `;
            productsContainer.appendChild(productCard);
        });
    };

    const addProduct = (product) => {
        products.push(product);
        saveProducts();
        renderProducts();
    };

    const editProduct = (index) => {
        const product = products[index];
        document.getElementById('product-id').value = index;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-description').value = product.description;
        document.getElementById('product-image').value = product.image;
        document.getElementById('product-quantity').value=product.quantity;
    };

    const updateProduct = (index, updatedProduct) => {
        products[index] = updatedProduct;
        saveProducts();
        renderProducts();
    };

    const deleteProduct = (index) => {
        products.splice(index, 1);
        saveProducts();
        renderProducts();
    };

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('product-id').value;
        const name = document.getElementById('product-name').value;
        const price = document.getElementById('product-price').value;
        const description = document.getElementById('product-description').value;
        const image = document.getElementById('product-image').value || 'https://via.placeholder.com/150';
        const quantity=document.getElementById('product-quantity').value;

        const product = { name, price, description, image,quantity };

        if (id === '') {
            addProduct(product);
        } else {
            updateProduct(id, product);
            document.getElementById('product-id').value = '';
        }

        productForm.reset();
    });

    renderProducts();
    window.editProduct = editProduct;
    window.deleteProduct = deleteProduct;
});
