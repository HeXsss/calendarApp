const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config()
app.use(bodyParser.json());

app.listen(port, (req, res, next) => {
  console.log(`🚀 Server booted on port ${port}`)
});