const socket = io();
socket.on('updateRealTimeProductsView', (updatedProducts) => {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  updatedProducts.forEach((product) => {
    const productItem = document.createElement('div');
    productItem.classList.add('product-card');
    productItem.innerHTML = `
      <img src="${product.thumbnails}" alt="${product.title} Thumbnail">
      <div class="product-details">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <p>Code: ${product.code}</p>
        <p>Price: $${product.price}</p>
        <p>Stock: ${product.stock}</p>
        <p>Category: ${product.category}</p>
      </div>
    `;

    productList.appendChild(productItem);
  });
});
document.getElementById('createProductForm').addEventListener('submit', (event) => {
  event.preventDefault();  
  const productTitle = document.getElementById('productTitle').value;
  socket.emit('createProduct', { title: productTitle });
});

document.getElementById('deleteProductForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const productId = document.getElementById('productId').value;
  socket.emit('eliminateProduct', { id: productId });
});