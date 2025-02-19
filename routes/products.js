const express = require('express');
const router = express.Router();

// ...existing code...

// Ruta para manejar GET /products/:id
router.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    // Aquí deberías agregar la lógica para obtener el producto por ID
    // Por ejemplo, podrías buscar el producto en una base de datos
    // y luego enviar la respuesta con el producto encontrado.
    res.send(`Producto con ID: ${productId}`);
});

// ...existing code...

module.exports = router;
