require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')

const app = express()
const {SERVER_PORT,SESSION_SECRET,CONNECTION_STRING} = process.env
const PORT = SERVER_PORT

const auth = require('./authController')
const ct = require('./apiController')

app.use(express.json())
app.use(session({
    secret:SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:10000000
    }
}))


massive(CONNECTION_STRING).then(db =>{
    app.set('db',db)
    console.log('DFT has das DATA!')
    app.listen(PORT,console.log(`Welcome to Das Funky Towne, listening on ${PORT}!`))
}).catch(err=>{console.log(err)})


//Auth Endpoints

    // app.post('/auth/login', auth.login)
    // app.post('/auth/logout', auth.logout)
    app.post('/auth/register', auth.register)

//API Endpoints

    // app.get('/api/materials', ct.getMaterials)
    // app.get('/api/products', ct.getProducts)
    // app.get('/api/overview', ct.getoverview)
    // app.post('/api/create/template', ct.createTemplate)
    // app.post('/api/counter', ct.counter)
    // app.post('/api/create/material', ct.createMaterial)
    // app.put('/api/update/onhand/material', ct.updateOnhandMaterial)
    // app.put('/api/update/onhand/product', ct.updateOnhandProduct)
    // app.delete('/api/delete/material', ct.deleteMaterial)
    // app.delete('/api/delete/template', ct.deleteTemplate)