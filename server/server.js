const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')
const router = require('./routes/routes')

const app = express()
const PORT = 3030

app.use(cors({ credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use('/faq', router.faq)
app.use('/ourTeam', router.ourTeam)
app.use('/subscriber', router.subscribers)
app.use('/sendEmail', router.contact)
app.use('/users', router.users)
app.use('/products', router.products)
app.use('/orders', router.orders)
app.use('/blogs', router.blogs)

app.listen(PORT, () => {
    console.log(`My app listening on Port ${PORT}`)
})

mongoose.connect('mongodb+srv://bd7hgdb72:Meryem123@cluster0.orpki97.mongodb.net/').then(() => {
    console.log('Mongo Connected')
})