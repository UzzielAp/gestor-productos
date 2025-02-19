const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'GestorProductos',
  port: 3306
};

const connection = mysql.createConnection(dbConfig);

connection.connect(err => {
  if (err) {
    console.error('Error en la conexión con la base de datos:', err);
    return;
  }
  console.log('Conectado a MySQL');
});

app.get('/products', (req, res) => {
  connection.query('SELECT * FROM Products', (err, result) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(result);
  });
});

app.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  const query = 'SELECT * FROM Products WHERE id = ?';
  connection.query(query, [productId], (err, result) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    if (result.length === 0) {
      return res.status(404).send('Producto no encontrado');
    }
    res.json(result[0]);
  });
});

app.post('/products', (req, res) => {
  const { name, price, descripcion } = req.body;
  const query = 'INSERT INTO Products (name, price, descripcion) VALUES (?, ?, ?)';
  connection.query(query, [name, price, descripcion], (err, result) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(201).json({ message: 'Product added', id: result.insertId });
  });
});

app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, descripcion } = req.body;
  const query = 'UPDATE Products SET name = ?, price = ?, descripcion = ? WHERE id = ?';
  connection.query(query, [name, price, descripcion, id], (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json({ message: 'Product updated' });
  });
});

app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Products WHERE id = ?';
  connection.query(query, [id], (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json({ message: 'Product deleted' });
  });
});

app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});
