const Product = require('../models/Product'); // Asegúrate de que Product es tu modelo

// Crear un producto
exports.createProduct = async (data) => {
    const product = new Product(data);
    return await product.save();
};

// Actualizar un producto
exports.updateProduct = async (id, data) => {
    return await Product.findByIdAndUpdate(id, data, { new: true });
};

// Eliminar un producto
exports.deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};

// Obtener todos los productos
exports.getAllProducts = async () => {
    return await Product.find(); // Devuelve todos los productos
};

// Obtener un producto por ID
exports.getProductById = async (id) => {
    return await Product.findById(id); // Busca un producto por ID
};
