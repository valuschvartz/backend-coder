Aquí tienes el **README.md** adaptado para tu proyecto de ecommerce con la estructura y detalles que me proporcionaste:

```markdown
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
- [Notas Adicionales](#notas-adicionales)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Estructura del Proyecto

## Estructura del Proyecto

```plaintext
📁 ecommerce-project/
│
├── 📄 app.js                        # Configuración principal del servidor
├── 📄 .env                          # Variables de entorno
├── 📄 .gitignore                    # Archivos y carpetas a ignorar en Git
├── 📄 package.json                  # Dependencias y scripts
├── 📄 package-lock.json             # Lock de dependencias
├── 📁 config/
│   └── 📄 passport.js               # Configuración de Passport para JWT
├── 📁 controllers/
│   └── 📄 cartController.js         # Controladores de carrito
│   └── 📄 productController.js      # Controladores de producto
│   └── 📄 userController.js         # Controladores de usuario
├── 📁 daos/
│   └── 📄 CartDAO.js                # DAO de carrito
│   └── 📄 ProductDAO.js             # DAO de producto
│   └── 📄 TicketDAO.js              # DAO de ticket
│   └── 📄 UserDAO.js                # DAO de usuario
├── 📁 dtos/
│   └── 📄 CartDTO.js                # DTO de carrito
│   └── 📄 ProductDTO.js             # DTO de producto
│   └── 📄 TicketDTO.js              # DTO de ticket
│   └── 📄 UserDTO.js                # DTO de usuario
├── 📁 models/
│   ├── 📄 User.js                   # Modelo de usuario
│   ├── 📄 Product.js                # Modelo de producto
│   └── 📄 Cart.js                   # Modelo de carrito
├── 📁 repositories/
│   └── 📄 BaseRepository.js         # Base de repositorio
│   └── 📄 CartRepository.js         # Repositorio de carrito
│   └── 📄 ProductRepository.js      # Repositorio de producto
│   └── 📄 TicketRepository.js       # Repositorio de ticket
│   └── 📄 UserRepository.js         # Repositorio de usuario
├── 📁 routes/
│   └── 📄 users.js                  # Rutas de usuario
│   └── 📄 carts.js                  # Rutas de carrito
│   └── 📄 products.js               # Rutas de productos
│   └── 📄 sessions.js               # Rutas de sesiones
├── 📁 services/
│   └── 📄 cartService.js            # Lógica de negocio para carritos
│   └── 📄 productService.js         # Lógica de negocio para productos
│   └── 📄 userService.js            # Lógica de negocio para usuarios
├── 📁 views/
│   ├── 📄 register.handlebars       # Vista de registro
│   ├── 📄 login.handlebars          # Vista de login
│   └── 📄 layouts/
│       └── 📄 main.handlebars       # Layout de Handlebars
├── 📁 node_modules/                 # Dependencias de Node.js
└── 📄 README.md                     # Documentación del proyecto


## Configuración

### Passport y JWT

El archivo **`passport.js`** configura Passport para usar una estrategia de autenticación JWT. Extrae el token JWT de las cookies y verifica la autenticidad del usuario.

### MongoDB

El proyecto se conecta a una base de datos MongoDB definida en el archivo **`.env`** mediante la variable **`MONGODB_URI`**.

### Rutas de la API

| **Método** | **Ruta**                      | **Descripción**                                      | **Protección**         |
|------------|--------------------------------|------------------------------------------------------|------------------------|
| POST       | `/api/users/register`          | Registro de un nuevo usuario                         | No                     |
| POST       | `/api/users/login`             | Inicia sesión y devuelve un token                    | No                     |
| GET        | `/api/users/current`           | Obtiene el usuario actual autenticado                | JWT                    |
| GET        | `/api/users`                   | Obtiene todos los usuarios                           | JWT                    |
| PUT        | `/api/users/:id`               | Actualiza información del usuario por ID             | JWT                    |
| DELETE     | `/api/users/:id`               | Elimina un usuario por ID                            | JWT                    |
| POST       | `/api/carts`                   | Crea un nuevo carrito                                | JWT                    |
| POST       | `/api/carts/:cartId/products`  | Agrega un producto al carrito                        | JWT                    |
| POST       | `/api/carts/:cid/purchase`     | Finaliza la compra del carrito                       | JWT                    |

## Pruebas en Postman

### **1. Registro de Usuario**
- **Método**: `POST`
- **URL**: `http://localhost:3000/api/users/register`
- **Body (JSON)**:
  ```json
  {
    "first_name": "John",
    "last_name": "Doe",
    "email": "johndoe@example.com",
    "age": 25,
    "password": "securePassword123"
  }
  ```

### **2. Login de Usuario**
- **Método**: `POST`
- **URL**: `http://localhost:3000/api/users/login`
- **Body (JSON)**:
  ```json
  {
    "email": "johndoe@example.com",
    "password": "securePassword123"
  }
  ```

### **3. Obtener Usuario Actual**
- **Método**: `GET`
- **URL**: `http://localhost:3000/api/users/current`
- **Headers**:
  - **Authorization**: `Bearer <USER_JWT_TOKEN>`
- **Descripción**: Obtiene los detalles del usuario autenticado.

### **4. Crear Carrito**
- **Método**: `POST`
- **URL**: `http://localhost:3000/api/carts`
- **Headers**:
  - **Authorization**: `Bearer <USER_JWT_TOKEN>`
- **Descripción**: Crea un carrito para el usuario autenticado.

### **5. Agregar Producto al Carrito**
- **Método**: `POST`
- **URL**: `http://localhost:3000/api/carts/:cartId/products`
- **Headers**:
  - **Authorization**: `Bearer <USER_JWT_TOKEN>`
- **Body (JSON)**:
  ```json
  {
    "productId": "<PRODUCT_ID>",
    "quantity": 2
  }
  ```

### **6. Finalizar Compra**
- **Método**: `POST`
- **URL**: `http://localhost:3000/api/carts/:cid/purchase`
- **Headers**:
  - **Authorization**: `Bearer <USER_JWT_TOKEN>`
- **Descripción**: Finaliza la compra de los productos en el carrito.

### **7. Crear Producto (Solo Administradores)**
- **Método**: `POST`
- **URL**: `http://localhost:3000/api/products`
- **Headers**:
  - **Authorization**: `Bearer <ADMIN_JWT_TOKEN>`
- **Body (JSON)**:
  ```json
  {
    "name": "Producto 1",
    "price": 100,
    "stock": 50,
    "description": "Descripción del producto"
  }
  ```

## Notas Adicionales

- **Seguridad de Cookies**: La cookie que almacena el token JWT es **httpOnly** para protegerla del acceso de JavaScript y **secure** en producción.
- **Roles de Usuario**: El modelo de usuario tiene un campo `role`, lo que permite futuras implementaciones de roles y permisos.
- **Hash de Contraseña**: Las contraseñas se guardan en la base de datos de forma segura utilizando el hash de **bcrypt**.
- **Token JWT**: El token JWT se utiliza para autenticar al usuario y se almacena en la cookie **jwt**.

## Contribuciones

Este proyecto sigue el código de conducta de SupleBoost. Para contribuir, asegúrate de realizar un **fork**, crear una rama específica para tu cambio y enviar un **Pull Request** detallado.

## Licencia

Este proyecto es privado y de uso exclusivo.

---


