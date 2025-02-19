const express = require('express');
const app = express();
const productsRouter = require('./routes/products');

// ...existing code...

app.use('/', productsRouter);

// ...existing code...

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
