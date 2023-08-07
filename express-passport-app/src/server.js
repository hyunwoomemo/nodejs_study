const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

mongoose.connect(`mongodb+srv://hyunwoomemo:132456@ayaan.0aerlae.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    console.log('mongoDB connected')
  })
  .catch((err) => {
    console.log(err)
  })

const port = 4000;

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})