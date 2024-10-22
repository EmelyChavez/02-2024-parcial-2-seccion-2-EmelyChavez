const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:5173', // Ajusta la URL de origen según sea necesario
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('../listaCompras'));

let MakeupList = [];

app.get('/items', (req, res) => {
  res.json(MakeupList);
});


app.post('/items', async (req, res) => {
  const { id } = req.body; 

  if (!id) {
    return res.status(400).json({ error: 'Se requiere un ID de producto' });
  }

  try {
    const response = await axios.get(`http://makeup-api.herokuapp.com/api/v1/products/${id}.json`); 
    const product = response.data;

    if (!product || !product.name || !product.price || !product.image_link) {
      return res.status(404).json({ error: 'Producto no encontrado en la API de Makeup' });
    }

    const newItem = {
      id: Date.now(), 
      name: product.name,
      price: product.price,
      image: product.image_link,
      isCompleted: false,
    };

    MakeupList.push(newItem);
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Error al conectarse a la API de Makeup' });
  }
});

app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const item = MakeupList.find((item) => item.id === parseInt(id));

  if (!item) {
    return res.status(404).json({ error: 'Articulo no encontrado' });
  }

  item.isCompleted = !item.isCompleted; 
  res.json(item);
});

app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  MakeupList = MakeupList.filter((item) => item.id !== parseInt(id));

  res.json({ message: 'Articulo eliminado' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../listaCompras', 'index.html')); 
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
