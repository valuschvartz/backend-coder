const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Ticket = require('../models/Ticket');
const CustomError = require('../routes/CustomError');

exports.addProductToCart = async (req, res, next) => {
    try {
        const { cartId } = req.params;
        const { productId, quantity } = req.body;

        const cart = await Cart.findById(cartId);
        if (!cart) {
            throw new CustomError('CART_NOT_FOUND');
        }

        const product = await Product.findById(productId);
        if (!product) {
            throw new CustomError('PRODUCT_NOT_FOUND');
        }

        const existingProductIndex = cart.products.findIndex(item => item.product.toString() === productId);

        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();

        res.status(200).json({
            message: 'Producto agregado al carrito',
            cart,
        });
    } catch (error) {
        next(error);
    }
};

exports.purchaseCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await Cart.findById(cid).populate('products.product');

        if (!cart) {
            throw new CustomError('CART_NOT_FOUND');
        }

        let totalAmount = 0;
        const productsToPurchase = [];
        const productsWithoutStock = [];

        for (const cartProduct of cart.products) {
            const product = cartProduct.product;
            const requestedQuantity = cartProduct.quantity;

            if (product.stock >= requestedQuantity) {
                product.stock -= requestedQuantity;
                await product.save();

                totalAmount += product.price * requestedQuantity;
                productsToPurchase.push({
                    productId: product._id,
                    quantity: requestedQuantity,
                });
            } else {
                productsWithoutStock.push(product._id);
            }
        }

        let ticket = null;
        if (productsToPurchase.length > 0) {
            ticket = await Ticket.create({
                amount: totalAmount,
                purchaser: req.user.email,
            });
        }

        cart.products = cart.products.filter(cartProduct =>
            productsWithoutStock.includes(cartProduct.product._id)
        );

        await cart.save();

        res.status(200).json({
            message: ticket ? 'Compra completada con éxito' : 'No se pudo completar la compra',
            ticket,
            productsNotProcessed: productsWithoutStock,
        });
    } catch (error) {
        next(error);
    }
};