// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const User = require('./models/User');  // Ajusta la ruta si es necesario

// const JWT_SECRET = process.env.JWT_SECRET || 'coder123';  // Usa la variable de entorno para el JWT_SECRET

// // Conectar a MongoDB
// mongoose
//     .connect('mongodb://localhost:27017/ecommerce', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => {
//         console.log('Conexión exitosa a MongoDB');
//         createAdmin();  // Llama a la función para crear el admin
//     })
//     .catch(err => console.error('Error al conectar a MongoDB:', err));

// async function createAdmin() {
//     const hashedPassword = bcrypt.hashSync('adminpassword', 10);  // Encriptar la contraseña

//     const adminUser = new User({
//         first_name: 'Admin',
//         last_name: 'User',
//         email: 'admin@example.com',
//         age: 30,
//         password: hashedPassword,
//         role: 'admin',  // Asegúrate de que el rol sea 'admin'
//     });

//     try {
//         await adminUser.save();  // Guardar el usuario en la base de datos
//         console.log('Admin user created');
//         mongoose.connection.close();  // Cerrar la conexión después de crear el admin
//     } catch (error) {
//         console.error('Error al crear el usuario admin:', error);
//         mongoose.connection.close();  // Cerrar la conexión en caso de error
//     }
// }
