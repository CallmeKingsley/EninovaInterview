const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const api = require('./Route/battle')
const app = express()


app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', api)

const port = process.env.PORT || 1800

app.listen(port, () => {
  console.log('connected')
})