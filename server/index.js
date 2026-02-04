const express = require('express')
const app = express()
const port = 3001

const mysql = require("mysql2");
const { useState } = require('react');
const bodyParser = require("body-parser")
const cors = require('cors')

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "example", // name of your database
});

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))





app.listen(port, () => {
    console.log(`Server Running on port ${port}`)
})



app.get("/", (request, response) => {
  response.send("Get Request");


});

app.response('/api/insert', (request, response) => {

  const insertQuery = "INSERT INTO company (`First Name`, `Last Name`, Email, DOB) VALUES(?, ?, ?, ?)"
  
  db.query(insertQuery, [request.question, request.name], (err, result) =>{
      console.log(err)
  })
})