const ProductService = require('../services/productService');
const CustomError = require('../routes/CustomError');

exports.createProduct = async (req, res, next) => {
    try {
        const product = await ProductService.createProduct(req.body);
        res.status(201).json({ message: 'Producto creado con éxito', product });
    } catch (error) {
        next(new CustomError('PRODUCT_CREATION_FAILED'));
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedProduct = await ProductService.updateProduct(id, req.body);
        res.status(200).json({ message: 'Producto actualizado con éxito', product: updatedProduct });
    } catch (error) {
        next(new CustomError('PRODUCT_UPDATE_FAILED'));
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        await ProductService.deleteProduct(id);
        res.status(200).json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
        next(new CustomError('PRODUCT_DELETE_FAILED'));
    }
};

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await ProductService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        next(new CustomError('PRODUCTS_FETCH_FAILED'));
    }
};

exports.getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await ProductService.getProductById(id);
        if (!product) {
            throw new CustomError('PRODUCT_NOT_FOUND');
        }
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};