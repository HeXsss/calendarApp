const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
require('dotenv').config()
const cors = require("cors");
app.use(cors());
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.get('/api/v1/reminders/get', (req, res, next) => {
  const queryDate = req.query.date || null
  setTimeout(() => {
    fs.readFile('./data/reminders.json', (err, json) => {
      let obj = JSON.parse(json);
      if (queryDate !== null) {
        obj = obj.filter(e => {
          const notificationDate = new Date(e.date)
          const filterDate = new Date(queryDate)
          const validYear = notificationDate.getFullYear() === filterDate.getFullYear()
          const validMonth = notificationDate.getMonth() === filterDate.getMonth()
          return (validYear && validMonth)
        })
      }
      console.log(`[FETCHED] ${obj.length} notifications`)
      res.send(obj);
    });  
  }, 500)
})

app.get('/api/v1/reminders/freeIndex', (req, res, next) => {
  fs.readFile('./data/reminders.json', (err, json) => {
    let obj = JSON.parse(json);
    const allIndexes = obj.map(e => e.id)
    let id = 1
    while (true) {
      if (!allIndexes.includes(id)) {
        res.send({
          id
        })
        return
      }
      id++
    }
  });  
})

app.post('/api/v1/reminders/add', (req, res, next) => {
  console.log(req.body)
  fs.readFile('./data/reminders.json', (err, json) => {
    let obj = JSON.parse(json);
    obj.push(req.body)
    fs.writeFile('./data/reminders.json', JSON.stringify(obj), (err) => {
      if (err) {
        console.log(err)
      } else {
        res.sendStatus(201).send()
      }
    })
  })
})

app.delete('/api/v1/reminders/delete', (req, res, next) => {
  console.log(req.body)
  fs.readFile('./data/reminders.json', (err, json) => {
    let obj = JSON.parse(json);
    obj = obj.filter(e => e.id !== req.body.id)
    fs.writeFile('./data/reminders.json', JSON.stringify(obj), (err) => {
      if (err) {
        console.log(err)
      } else {
        res.sendStatus(201).send()
      }
    })
  })
})

app.listen(port, (req, res, next) => {
  console.log(`🚀 Server booted on port ${port}`)
});
