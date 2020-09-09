const express = require('express');
const Llama = require('./models/llama');
const app = express();

app.use(express.json());


app.post('/api/v1/llamas', async(req, res, next) => {
  try {
    const createdLlama = await Llama.insert(req.body);
    res.send(createdLlama);
  } catch(error) {
    next(error);
  }
});


app.delete('/api/v1/llamas/:id', async(req, res, next) => {
  try {
    const deletedLlama = await Llama.delete(req.params.id);
    res.send(deletedLlama);
  } catch(error) {
    next(error);
  }
});


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
