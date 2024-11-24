const ProductService = require('../services/productService');

exports.createProduct = async (req, res) => {
    try {
        const product = await ProductService.createProduct(req.body);
        res.status(201).json({ message: 'Producto creado con éxito', product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await ProductService.updateProduct(id, req.body);
        res.status(200).json({ message: 'Producto actualizado con éxito', product: updatedProduct });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await ProductService.deleteProduct(id);
        res.status(200).json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
    try {
        const products = await ProductService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener un producto por ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductService.getProductById(id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
