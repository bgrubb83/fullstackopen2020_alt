const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body);
})

app.use(morgan(':method :url :status :response-time :body '));

let persons = [
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

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(p => p.id !== id);

  res.status(204).end();
})

function generateId(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'content missing'
    });
  }

  const existingPerson = persons.find(p => p.name === req.body.name);
  if (existingPerson) {
    return res.status(400).json({
      error: 'name must be unique'
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(10000),
  }

  persons = persons.concat(person);

  res.json(person);
})




const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})