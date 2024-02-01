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
const deleteProductForm = document.getElementById('deleteProductForm');

if (deleteProductForm) {
  deleteProductForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const productIdToDelete = parseInt(document.getElementById('productId').value, 10);
    console.log('Solicitud para eliminar producto con ID:', productIdToDelete);
    socket.emit('deleteProduct', productIdToDelete);
    console.log("producto eliminado", productIdToDelete);
  });

  socket.on('updateRealTimeProductsView', (updatedProducts) => {
    console.log('Actualizando la vista en tiempo real:', updatedProducts);
  });
}

