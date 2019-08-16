const express = require('express');
const boyParser = require('body-parser');

const app = express();
const PORT = process.env.POST || 3000;

app.use(boyParser.json());

app.get('/', (req, res, next) => {
  res.send('Hello users!');
});

app.listen(PORT);
