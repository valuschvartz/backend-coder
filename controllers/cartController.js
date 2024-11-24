const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Ticket = require('../models/Ticket');

exports.addProductToCart = async (req, res) => {
    try {
        const { cartId } = req.params; // ID del carrito
        const { productId, quantity } = req.body; // Producto y cantidad desde el cuerpo de la solicitud

        // Verificar si el carrito existe
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        // Verificar si el producto existe
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Verificar si el producto ya está en el carrito
        const existingProductIndex = cart.products.findIndex(item => item.product.toString() === productId);

        if (existingProductIndex !== -1) {
            // Si el producto ya está en el carrito, solo actualizamos la cantidad
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            // Si no está, lo agregamos al carrito
            cart.products.push({
                product: productId,
                quantity,
            });
        }

        await cart.save(); // Guardar el carrito actualizado

        res.status(200).json({
            message: 'Producto agregado al carrito',
            cart: cart, // Retornar el carrito actualizado
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el producto al carrito', error: error.message });
    }
};


exports.purchaseCart = async (req, res) => {
    try {
        const { cid } = req.params; // Obtener el ID del carrito
        const cart = await Cart.findById(cid).populate('products.product'); // Obtener el carrito con productos

        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        let totalAmount = 0;
        const productsToPurchase = [];
        const productsWithoutStock = [];

        // Verificar el stock de los productos
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
                productsWithoutStock.push(product._id);  // Productos sin stock
            }
        }

        let ticket = null;
        if (productsToPurchase.length > 0) {
            ticket = await Ticket.create({
                amount: totalAmount,
                purchaser: req.user.email,  // El comprador es el usuario autenticado
            });
        }

        // Filtrar los productos que no fueron comprados por falta de stock
        cart.products = cart.products.filter(cartProduct =>
            productsWithoutStock.includes(cartProduct.product._id)
        );

        await cart.save();  // Guardar los cambios en el carrito

        res.status(200).json({
            message: ticket ? 'Compra completada con éxito' : 'No se pudo completar la compra',
            ticket,
            productsNotProcessed: productsWithoutStock, // Productos sin stock
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al procesar la compra', error: error.message });
    }
};
