const express = require('express');
const app = express();

const persons = [
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 1
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 2
  },
  {
    name: "Tracey Chang",
    number: "456",
    id: 3
  },
  {
    name: "Shanice Bryant",
    number: "890",
    id: 4
  }
];

app.get('/info', (req, res) => {
  res.send(`
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>
  `);
})

app.get('/api/persons', (req, res) => {
  res.json(persons);
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})