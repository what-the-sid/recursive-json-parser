const express = require('express');

const bodyParser = require('body-parser');

const { Handler } = require('./scripts/mapper')

const server = express();
const port = process.env.PORT || 5000;
const jsonParser = bodyParser.json()


server.post('/parse-json',jsonParser, (req, res) => {
  try{
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
  }
  catch(error){
    let errorMessage = {
      error: true,
      errorCode: 500,
      details: "Internal Server Error",
    }
    res.status(errorMessage.errorCode).send(errorMessage)
  }

})

server.listen(port,()=>console.log(`Server running at port ${port}...`))
