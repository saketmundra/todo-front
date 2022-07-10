const connecttoMongo=require('./db')
const port = 5000
var cors = require('cors')
const express = require('express')

connecttoMongo();  
const app = express()

app.use(cors())

app.use(express.json())//to get data is json format

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))         


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})  

