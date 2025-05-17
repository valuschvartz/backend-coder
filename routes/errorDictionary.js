module.exports = {
    // Errores de Usuario
    EMAIL_ALREADY_EXISTS: {
      code: 1001,
      message: 'El email ya está registrado.'
    },
    USER_ALREADY_EXISTS: {
      code: 1002,
      message: 'El usuario ya existe.'
    },
    INVALID_USER_DATA: {
      code: 1003,
      message: 'Datos de usuario inválidos.'
    },
    PASSWORD_REQUIRED: {
      code: 1004,
      message: 'La contraseña es requerida.'
    },
    USER_NOT_FOUND: {
      code: 1005,
      message: 'Usuario no encontrado.'
    },
    PET_CREATION_FAILED: {
      code: 1006,
      message: 'No se pudo crear la mascota.'
    },
    INVALID_PASSWORD: {
      code: 1007,
      message: 'Contraseña incorrecta.'
    },
    TOKEN_NOT_PROVIDED: {
      code: 1008,
      message: 'Token no proporcionado.'
    },
  
    // Errores de Carrito
    CART_NOT_FOUND: {
      code: 2001,
      message: 'Carrito no encontrado.'
    },
  
    // Errores de Producto
    PRODUCT_NOT_FOUND: {
      code: 2002,
      message: 'Producto no encontrado.'
    },
    PRODUCT_CREATION_FAILED: {
      code: 2003,
      message: 'No se pudo crear el producto.'
    },
    PRODUCT_UPDATE_FAILED: {
      code: 2004,
      message: 'Error al actualizar el producto.'
    },
    PRODUCT_DELETE_FAILED: {
      code: 2005,
      message: 'Error al eliminar el producto.'
    },
    PRODUCTS_FETCH_FAILED: {
      code: 2006,
      message: 'Error al obtener los productos.'
    },
  
    // Errores de Tickets
    TICKET_NOT_FOUND: {
      code: 3001,
      message: 'Ticket no encontrado.'
    },
    TICKETS_FETCH_FAILED: {
      code: 3002,
      message: 'Error al obtener los tickets.'
    },
  
    // Error genérico
    INTERNAL_SERVER_ERROR: {
      code: 5000,
      message: 'Error interno del servidor.',
      status: 500
    }
  };