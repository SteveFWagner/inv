require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const pg = require('pg')
const pgSession = require('connect-pg-simple')(session)


const app = express()
const {SERVER_PORT,SESSION_SECRET,CONNECTION_STRING} = process.env
const PORT = SERVER_PORT

const pgPool = new pg.Pool({
    connectionString:CONNECTION_STRING
})

const auth = require('./authController')
const ct = require('./apiController')


app.use(express.json())
app.use(session({
    store:new pgSession({
        pool: pgPool,
        pruneSessionInterval: 60 * 60 * 24
    }),
    secret:SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000000000
    }
}))


massive(CONNECTION_STRING).then(db =>{
    app.set('db',db)
    console.log('DFT has das DATA!')
    app.listen(PORT,console.log(`Welcome to Das Funky Towne, listening on ${PORT}!`))
}).catch(err=>{console.log(err)})


//Auth Endpoints

    app.post('/auth/login', auth.login)
    app.post('/auth/logout', auth.logout)
    app.post('/auth/register', auth.register)
    app.get('/auth/current', auth.userCheck)

//API Endpoints

    app.get('/api/materials', ct.getMaterials)
    app.get('/api/products', ct.getProducts)
    app.get('/api/overview', ct.getOverview)
    app.get('/api/templates', ct.getTemplates)
    app.get('/api/materials/totalCost', ct.getMaterialsTotalCost)
    app.get('/api/materials/uniqueCount', ct.getMaterialsUniqueCount)
    app.get('/api/products/totalCost', ct.getProductsTotalCost)
    app.get('/api/products/uniqueCount', ct.getProductsUniqueCount)
    app.post('/api/create/template', ct.createTemplate)
    app.post('/api/create/material', ct.createMaterial)
    app.put('/api/create/products/:id', ct.createProducts)
    app.put('/api/update/onhand/material/:id', ct.updateOnhandMaterial)
    app.put('/api/update/onhand/product/:id', ct.updateOnhandProduct)
    app.delete('/api/delete/template/:id', ct.deleteTemplate)
