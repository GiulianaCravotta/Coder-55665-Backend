//realTimeProducts.js
const socket = io();

socket.on('connect', () => {
  console.log('Conectado al servidor de sockets');
});

const createProductForm = document.getElementById('createProductForm');
if (createProductForm) {
  createProductForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const productTitle = document.getElementById('productTitle').value;
    const productDescription = document.getElementById('productDescription').value;
    const productCode = document.getElementById('productCode').value;
    const productPrice = document.getElementById('productPrice').value;
    const productStock = document.getElementById('productStock').value;
    const productCategory = document.getElementById('productCategory').value;
    const productThumbnail = document.getElementById('productImage').value;

    const thumbnails = [productThumbnail];

    console.log('Solicitud para crear producto:', productTitle);

    socket.emit('createProduct', {
      title: productTitle,
      description: productDescription,
      code: productCode,
      price: productPrice,
      stock: productStock,
      category: productCategory,
      thumbnails: thumbnails
    });
  });
}

socket.on('createProduct', (newProduct) => {
  const productContainer = document.getElementById('product-list');
  const productCard = document.createElement('div');
  productCard.classList.add('product-container');
  productCard.innerHTML = `
    <div class="product-card">
      <img src="${newProduct.thumbnails[0]}" alt="${newProduct.title} Thumbnail">
      <div class="product-details">
        <h3>${newProduct.title}</h3>
        <p>${newProduct.description}</p>
        <p>Code: ${newProduct.code}</p>
        <p>Price: $${newProduct.price}</p>
        <p>Stock: ${newProduct.stock}</p>
        <p>Category: ${newProduct.category}</p>
      </div>
    </div>
  `;
  productContainer.appendChild(productCard);
});

const deleteProductForm = document.getElementById('deleteProductForm');
if (deleteProductForm) {
  deleteProductForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const productIdToDelete = parseInt(document.getElementById('productId').value, 10);
    console.log('Solicitud para eliminar producto con ID:', productIdToDelete);
    socket.emit('deleteProduct', productIdToDelete);
    console.log("producto eliminado", productIdToDelete);
  });
}

socket.on('deleteProduct', (deletedProductId) => {
  const productToDelete = document.getElementById(`product-${deletedProductId}`);
  if (productToDelete) {
    productToDelete.remove();
    console.log(`Producto eliminado con ID: ${deletedProductId}`);
  } else {
    console.log(`No se encontró el producto con ID: ${deletedProductId}`);
  }
});