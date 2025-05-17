// routes/mocking.router.js
const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();

// Función para generar una mascota falsa
const generateFakePet = () => ({
  _id: faker.database.mongodbObjectId(),
  name: faker.animal.cat(),
  species: faker.animal.type(),
  breed: faker.animal.dog(), // aunque sea gato elijo razas aleatorias
  age: faker.datatype.number({ min: 1, max: 15 }),
  adopted: false,
  owner: null,
  __v: 0
});

// Endpoint que genera mascotas falsas
router.get('/mockingpets', (req, res) => {
  const pets = Array.from({ length: 100 }, generateFakePet);
  res.json({ status: 'success', payload: pets });
});

module.exports = router;