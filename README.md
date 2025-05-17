Perfecto. Acá tenés el README.md completo y actualizado, incluyendo la nueva sección de Mocking y Manejo de Errores:

⸻



# Ecommerce Project

Este es un proyecto de ecommerce diseñado para manejar el registro de usuarios, autenticación mediante JWT, gestión de sesiones, y CRUD completo de usuarios. El proyecto está construido con **Node.js**, **Express**, **MongoDB**, **Passport** para autenticación y **Handlebars** para renderizado de vistas.

## Características

- **Registro de usuario**: Crea un nuevo usuario y guarda su información en MongoDB.
- **Autenticación JWT**: Utiliza JSON Web Tokens para autenticar usuarios y almacenar el token en una cookie segura.
- **Operaciones CRUD**: CRUD completo para gestionar usuarios.
- **Vistas con Handlebars**: Usa Handlebars para renderizar páginas de registro y login.
- **Referencias de Carrito**: El modelo de usuario incluye una referencia a un carrito (`Cart`).

## Tabla de Contenidos

- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración](#configuración)
- [Rutas de la API](#rutas-de-la-api)
- [Pruebas en Postman](#pruebas-en-postman)
- [Mocking y Manejo de Errores](#mocking-y-manejo-de-errores)
- [Notas Adicionales](#notas-adicionales)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Estructura del Proyecto

```plaintext
📁 ecommerce-project/
│
├── 📄 app.js
├── 📄 .env
├── 📄 .gitignore
├── 📄 package.json
├── 📁 config/
│   └── 📄 passport.js
├── 📁 controllers/
├── 📁 daos/
├── 📁 dtos/
├── 📁 models/
├── 📁 repositories/
├── 📁 routes/
├── 📁 services/
├── 📁 views/

Configuración

Passport y JWT

El archivo passport.js configura Passport para usar una estrategia de autenticación JWT. Extrae el token JWT de las cookies y verifica la autenticidad del usuario.

MongoDB

El proyecto se conecta a una base de datos MongoDB definida en el archivo .env mediante la variable MONGODB_URI.

Rutas de la API

Método	Ruta	Descripción	Protección
POST	/api/users/register	Registro de un nuevo usuario	No
POST	/api/users/login	Inicia sesión y devuelve un token	No
GET	/api/users/current	Obtiene el usuario actual autenticado	JWT
GET	/api/users	Obtiene todos los usuarios	JWT
PUT	/api/users/:id	Actualiza información del usuario por ID	JWT
DELETE	/api/users/:id	Elimina un usuario por ID	JWT
POST	/api/carts	Crea un nuevo carrito	JWT
POST	/api/carts/:cartId/products	Agrega un producto al carrito	JWT
POST	/api/carts/:cid/purchase	Finaliza la compra del carrito	JWT

Pruebas en Postman

Registro de Usuario

POST /api/users/register

{
  "first_name": "John",
  "last_name": "Doe",
  "email": "johndoe@example.com",
  "age": 25,
  "password": "securePassword123"
}

Login de Usuario

POST /api/users/login

{
  "email": "johndoe@example.com",
  "password": "securePassword123"
}

Obtener Usuario Actual

GET /api/users/current
Authorization: Bearer <USER_JWT_TOKEN>

Crear Carrito

POST /api/carts
Authorization: Bearer <USER_JWT_TOKEN>

Agregar Producto al Carrito

POST /api/carts/:cartId/products
Authorization: Bearer <USER_JWT_TOKEN>

{
  "productId": "<PRODUCT_ID>",
  "quantity": 2
}

Finalizar Compra

POST /api/carts/:cid/purchase
Authorization: Bearer <USER_JWT_TOKEN>

Crear Producto (Admin)

POST /api/products
Authorization: Bearer <ADMIN_JWT_TOKEN>

{
  "name": "Producto 1",
  "price": 100,
  "stock": 50,
  "description": "Descripción del producto"
}

Mocking y Manejo de Errores

Mocking de Productos

Se implementa una ruta de prueba para simular productos falsos usando @faker-js/faker.
	•	Ruta: GET /api/mockingproducts
	•	Descripción: Genera y devuelve 100 productos aleatorios.

{
  "status": "success",
  "products": [
    {
      "title": "Incredible Cotton Chair",
      "description": "A fantastic item",
      "price": 43.55,
      "stock": 25,
      "category": "Furniture",
      "code": "A1B2C3",
      "status": true
    },
    ...
  ]
}

Manejo Centralizado de Errores

El proyecto incluye un middleware global para capturar y responder errores.
	•	Archivo: middlewares/errorHandler.js
	•	Salida en caso de error:

{
  "status": "error",
  "message": "Ocurrió un error inesperado"
}

	•	En entorno de desarrollo (process.env.NODE_ENV === 'development'), también se incluye el stack del error para debugging.

Notas Adicionales
	•	Cookies Seguras: JWT almacenado en cookies httpOnly (seguras contra XSS).
	•	Roles: El modelo User tiene un campo role para futuros permisos.
	•	Contraseñas Hasheadas: Se usa bcrypt para guardar contraseñas de forma segura.
	•	JWT: El token se genera en login y se almacena en una cookie llamada jwt.

Contribuciones

Este proyecto sigue el código de conducta de SupleBoost. Para contribuir, asegurate de realizar un fork, crear una rama específica para tu cambio y enviar un Pull Request detallado.

Licencia

Este proyecto es privado y de uso exclusivo.



