import express from 'express'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json())
app.use(function (_req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})

app.post('/citizen/:name/:posX/:posY', (req, res) => {
    const {name, posX, posY} = req.params;

})

app.post('/victim/:name/:posX/:posY', (req, res) => {
    const {name, posX, posY} = req.params;

})

app.get('/getJack', (req, res) => {

})

app.delete('/evidences', (req, res) => {

})

export default app
