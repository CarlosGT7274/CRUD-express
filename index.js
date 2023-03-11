const express = require('express');
const app = express();

// Arreglo con los tacos
const tacos = [
  { id: 1, nombre: 'Taco al pastor', precio: 10, tipo: 'taco' },
  { id: 2, nombre: 'Taco de carne asada', precio: 12, tipo: 'taco' },
  { id: 3, nombre: 'Taco de pescado', precio: 15, tipo: 'taco' },
];

app.use(express.json());

app.get('/tacos', (req, res) => {
  res.json(tacos);
});

// Ruta para crear un nuevo taco
app.post('/tacos', (req, res) => {
  // Obtener el nuevo taco desde el body del request
  const nuevoTaco = req.body;
  
    const ultimoTaco = tacos[tacos.length - 1];
  const nuevoId = ultimoTaco ? ultimoTaco.id + 1 : 1;
  nuevoTaco.id = nuevoId;
  
  // Agregar el nuevo taco al arreglo
  tacos.push(nuevoTaco);
  
  // Responder con el arreglo actualizado
  res.json(tacos);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

app.put('/tacos/:id', (req, res) => {
  const id = Number(req.params.id)

  const tacoexsistente =  tacos.find(taco => taco.id === id);

  if(!tacoexsistente){
    res.status(404).send(`No se encontro el taco ${id}`)
  }

  const nuevosdatos = req.body

  tacoexsistente.nombre = nuevosdatos.nombre;
  tacoexsistente.precio = nuevosdatos.precio;
  tacoexistente.tipo = nuevosdatos.tipo;
  
  res.json(tacoexsistente);
})

//PUT
const id = 3;
const nuevoTaco = { nombre: 'Taco actualizado', precio: 7};

fetch(`http://localhost:4000/tacos/${id}`, {
  method: "PUT",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify(nuevoTaco)
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));




