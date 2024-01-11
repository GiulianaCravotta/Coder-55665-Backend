const fs = require('fs');

class ProductManager {
    constructor() {
        this.path = './productos.json';
        this.products = [];
        this.productIdCounter = 1;

        // carga los productos
        this.loadProducts();
    }

    async addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }
        if (this.products.some(p => p.code === product.code)) {
            console.error("Ya existe un producto con el mismo código");
            return;
        }
        const newProduct = {
            id: this.productIdCounter++,
            ...product
        };

        this.products.push(newProduct);
        await this.saveProducts();
        console.log(`Se ha agregado el producto ${newProduct.title}`);
    }
    getProducts(limit) {
        let result = this.products;
        if(limit){
            result = this.products.slice(0, limit)
        }
        return result;
    }
    async getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            console.error(`Producto no encontrado con el id: ${id}`);
            return null;
        }
        return product;
    }
    async updateProduct(id, updatedFields) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) {
            console.error(`Producto no encontrado con el id: ${id}`);
            return;
        }

        this.products[index] = {
            ...this.products[index],
            ...updatedFields
        };
        await this.saveProducts();
        console.log(`Producto actualizado con éxito`);
    }
    async deleteProduct(id) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) {
            console.error(`Producto no encontrado con el id: ${id}`);
            return;
        }

        this.products.splice(index, 1);
        await this.saveProducts();
        console.log(`Producto id ${id} eliminado con éxito`);
    }
    async loadProducts() {
        try {
            const data = await fs.readFileSync(this.path, 'utf8');
            //
            const parseData = JSON.parse(data);
            if(Array.isArray(parseData.products)){
                this.products = parseData.products;
                this.productIdCounter = Math.max(...this.products.map(p => p.id)) + 1;
            }else{
                throw new Error('El archivo products.json no tiene la estructura correcta')
            }
            //
        } catch (error) {
            this.products = [];
        }
    }
    async saveProducts() {
        try {
            const data = JSON.stringify(this.products, null, 2);
            await fs.writeFileSync(this.path, data, 'utf8');
        } catch (error) {
            console.error('Error al guardar productos en el archivo:', error.message);
        }
    }
}

module.exports = ProductManager;

