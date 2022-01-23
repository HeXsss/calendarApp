const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
require('dotenv').config()
const cors = require("cors");
app.use(cors());
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.get('/api/v1/reminders', (req, res, next) => {
  const queryDate = req.query.date || null
  setTimeout(() => {
    fs.readFile('./data/reminders.json', (err, json) => {
      let obj = JSON.parse(json);
      if (queryDate !== null) {
        obj = obj.filter(e => {
          const notificationDate = new Date(e.date)
          const filterDate = new Date(queryDate)
          console.log(notificationDate)
          console.log(filterDate)
          const validYear = notificationDate.getFullYear() === filterDate.getFullYear()
          const validMonth = notificationDate.getMonth() === filterDate.getMonth()
          return (validYear && validMonth)
        })
      }
      res.send(obj);
    });  
  }, 1000)
})

app.listen(port, (req, res, next) => {
  console.log(`🚀 Server booted on port ${port}`)
});
