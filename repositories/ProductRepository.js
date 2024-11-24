const BaseRepository = require('./BaseRepository');
const ProductDAO = require('../daos/ProductDAO');

class ProductRepository extends BaseRepository {
    constructor() {
        super(ProductDAO);
    }

    /**
     * Buscar un producto por su ID.
     * @param {String} id - ID del producto.
     * @returns {Object} - Producto encontrado.
     */
    async findById(id) {
        return await this.dao.findById(id);
    }

    /**
     * Buscar todos los productos.
     * @returns {Array} - Lista de productos.
     */
    async findAll() {
        return await this.dao.findAll();
    }

    /**
     * Crear un nuevo producto.
     * @param {Object} productData - Datos del producto.
     * @returns {Object} - Producto creado.
     */
    async createProduct(productData) {
        return await this.dao.create(productData);
    }

    /**
     * Actualizar un producto por su ID.
     * @param {String} id - ID del producto.
     * @param {Object} updateData - Datos para actualizar.
     * @returns {Object} - Producto actualizado.
     */
    async updateProduct(id, updateData) {
        return await this.dao.update(id, updateData);
    }

    /**
     * Eliminar un producto por su ID.
     * @param {String} id - ID del producto.
     * @returns {Object} - Producto eliminado.
     */
    async deleteProduct(id) {
        return await this.dao.delete(id);
    }
}

module.exports = new ProductRepository();
