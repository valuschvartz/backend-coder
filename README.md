
Ecommerce Project 

Este es un proyecto de ecommerce diseñado para manejar el registro de usuarios, autenticación mediante JWT, gestión de sesiones, y CRUD completo de usuarios. El proyecto está construido con Node.js, Express, MongoDB, Passport para autenticación y Handlebars para renderizado de vistas.

Características

	•	Registro de usuario: Crea un nuevo usuario y guarda su información en MongoDB.
	•	Autenticación JWT: Utiliza JSON Web Tokens para autenticar usuarios y almacenar el token en una cookie segura.
	•	Operaciones CRUD: CRUD completo para gestionar usuarios.
	•	Vistas con Handlebars: Usa Handlebars para renderizar páginas de registro y login.
	•	Referencias de Carrito: El modelo de usuario incluye una referencia a un carrito (modelo Cart).

Tabla de Contenidos

	•	Estructura del Proyecto
	•	Configuración
	•	Rutas de la API
	•	Pruebas en Postman


Estructura del Proyecto

📁 ecommerce-project/
│
├── 📄 app.js                  # Configuración principal del servidor
├── 📄 .env                    # Variables de entorno
├── 📄 .gitignore              # Archivos y carpetas a ignorar en Git
├── 📄 package.json            # Dependencias y scripts
├── 📁 config/
│   └── 📄 passport.js         # Configuración de Passport para JWT
├── 📁 controllers/
│   └── 📄 userController.js   # Controladores de usuario
├── 📁 models/
│   ├── 📄 User.js             # Modelo de usuario
│   └── 📄 Cart.js             # Modelo de carrito
├── 📁 routes/
│   └── 📄 users.js            # Rutas de usuario
├── 📁 views/
│   ├── 📄 register.handlebars # Vista de registro
│   ├── 📄 login.handlebars    # Vista de login
│   └── 📄 layouts/
│       └── 📄 main.handlebars # Layout de Handlebars
└── 📁 node_modules/           # Dependencias de Node.js

Configuración

Passport y JWT

El archivo passport.js configura Passport para que use una estrategia de autenticación JWT, extrae el token JWT de las cookies, y verifica al usuario.

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

Pruebas en Postman

Registro de Usuario

	•	Método: POST
	•	URL: http://localhost:3000/api/users/register
	•	Body:

{
  "first_name": "John",
  "last_name": "Doe",
  "email": "johndoe@example.com",
  "age": 25,
  "password": "securePassword123"
}



Login de Usuario

	•	Método: POST
	•	URL: http://localhost:3000/api/users/login
	•	Body:

{
  "email": "johndoe@example.com",
  "password": "securePassword123"
}



Obtener Usuario Actual

	•	Método: GET
	•	URL: http://localhost:3000/api/users/current
	•	Cookies: Asegúrate de incluir el token JWT en las cookies (jwt=<token>).

Actualizar Usuario

	•	Método: PUT
	•	URL: http://localhost:3000/api/users/<id>
	•	Headers: Authorization: Bearer <token>

Eliminar Usuario

	•	Método: DELETE
	•	URL: http://localhost:3000/api/users/<id>
	•	Headers: Authorization: Bearer <token>

Notas Adicionales

	•	Seguridad de Cookies: La cookie que almacena el token JWT es httpOnly para protegerla del acceso de JavaScript y secure en producción.
	•	Roles de Usuario: El modelo de usuario tiene un campo role, lo que permite futuras implementaciones de roles y permisos.
	•	Hash de Contraseña: Las contraseñas se guardan en la base de datos de forma segura utilizando el hash de bcrypt.

Contribuciones

Este proyecto sigue el código de conducta de SupleBoost. Para contribuir, asegúrate de realizar un fork, crear una rama específica para tu cambio y enviar un Pull Request detallado.

Licencia

Este proyecto es privado y de uso exclusivo

