const express = require('express')
const app = express()
const port = 3001


app.listen(port, () => {
    console.log(`Server Running on port ${port}`)
})


app.get("/", (request, response) => {
  response.send("hello world");
});