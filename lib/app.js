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

// place app.delete below

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
