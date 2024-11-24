const Product = require('../models/Product');

class ProductDAO {
    /**
     * Crear un nuevo producto.
     * @param {Object} productData - Datos del producto.
     * @returns {Object} - Producto creado.
     */
    async create(productData) {
        return await Product.create(productData);
    }

    /**
     * Buscar un producto por su ID.
     * @param {String} id - ID del producto.
     * @returns {Object} - Producto encontrado.
     */
    async findById(id) {
        return await Product.findById(id);
    }

    /**
     * Buscar todos los productos.
     * @returns {Array} - Lista de productos.
     */
    async findAll() {
        return await Product.find();
    }

    /**
     * Actualizar un producto por su ID.
     * @param {String} id - ID del producto.
     * @param {Object} updateData - Datos para actualizar.
     * @returns {Object} - Producto actualizado.
     */
    async update(id, updateData) {
        return await Product.findByIdAndUpdate(id, updateData, { new: true });
    }

    /**
     * Eliminar un producto por su ID.
     * @param {String} id - ID del producto.
     * @returns {Object} - Producto eliminado.
     */
    async delete(id) {
        return await Product.findByIdAndDelete(id);
    }
}

module.exports = new ProductDAO();
