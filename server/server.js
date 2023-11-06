const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const knex = require('knex')(require('./knexfile.js')['development']);

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('Server Connected Successfully')
})

app.get('/movies', (req, res) => {
  knex('movies')
  .select('title')
  .then(data => {
    res.status(200).send(data)
  })
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  knex('movies')
  .select('title')
  .where('id', '=', id)
  .then(data => {
    res.status(200).send(data)
  })
})

app.post('/movies', (req, res) => {
  const {title} = req.body
  knex('movies')
  .insert({title: title})
  .then(data => {
    res.status(201).send(`${title} successfully added`)
  })
})

app.patch('/movies/:id', (req, res) => {
  const {id} = req.params
  const {title} = req.body
  return knex('movies')
  .select('title')
  .where('id', '=', id)
  .update({title: title})
  .then(data => {
    res.status(201).send(`${title} successfully updated`)
  })
})

app.delete('/movies', (req, res) => {
  const {title} = req.body
  knex('movies')
  .where('title', '=', title)
  .del()
  .then(data => {
    res.status(200).send(`${title} successfully deleted`)
  })

})

app.listen(port)