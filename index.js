const express = require('express');

const path = require('path');
const bodyParser = require('body-parser');

const { Handler } = require('./scripts/json-mapper')

const server = express();
const port = process.env.PORT || 5000;
const jsonParser = bodyParser.json()


server.post('/parse-json',jsonParser, (req, res) => {
  let body = req.body
  let handler = new Handler()
  handler.mapper(body).then(result=>{
    if(result && !result.error){
      res.send(result.data)
    }
    else{
      res.status(result.errorCode).send(result)
    }

  })
})

server.listen(port,()=>console.log(`Server running at port ${port}...`))
