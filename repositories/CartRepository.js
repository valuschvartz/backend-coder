const BaseRepository = require('./BaseRepository');
const CartDAO = require('../daos/CartDAO');

class CartRepository extends BaseRepository {
    constructor() {
        super(CartDAO);
    }

    /**
     * Obtener un carrito por su ID con los productos poblados.
     * @param {String} id - ID del carrito.
     * @returns {Object} - Carrito con productos.
     */
    async getCartById(id) {
        return await this.dao.getCartById(id);
    }

    /**
     * Actualizar un carrito con nuevos datos.
     * @param {String} id - ID del carrito.
     * @param {Object} updateData - Datos para actualizar.
     * @returns {Object} - Carrito actualizado.
     */
    async updateCart(id, updateData) {
        return await this.dao.updateCart(id, updateData);
    }

    /**
     * Eliminar un carrito por su ID.
     * @param {String} id - ID del carrito.
     * @returns {Object} - Carrito eliminado.
     */
    async deleteCart(id) {
        return await this.dao.deleteCart(id);
    }
}

module.exports = new CartRepository();
