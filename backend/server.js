const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const dbConfig = {
  user: 'your_username',
  password: 'your_password',
  server: 'localhost',
  database: 'your_database',
  options: {
    encrypt: true, // Use this if you're on Windows Azure
    trustServerCertificate: true // Change to true for local dev / self-signed certs
  }
};

sql.connect(dbConfig, err => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to SQL Server');
});

app.get('/products', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Products`;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/products', async (req, res) => {
  const { name, price, descripcion } = req.body;
  try {
    await sql.query`INSERT INTO Products (name, price, descripcion) VALUES (${name}, ${price}, ${descripcion})`;
    res.status(201).send('Product added');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, descripcion } = req.body;
  try {
    await sql.query`UPDATE Products SET name = ${name}, price = ${price}, descripcion = ${descripcion} WHERE id = ${id}`;
    res.send('Product updated');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await sql.query`DELETE FROM Products WHERE id = ${id}`;
    res.send('Product deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});