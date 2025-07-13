// index.js
const express = require('express');
const app     = express();
const port    = 8080

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world! 🌍');
});

app.post('/echo', (req, res) => {
  res.json({ youSent: req.body });
})

app.use((req, res) => {
  res.status(404).send({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something broke!' });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
