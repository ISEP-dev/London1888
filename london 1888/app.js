import express from 'express'
import bodyParser from 'body-parser'
import Dal from "./dal";

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

/**
 * @returns the closest citizen from the victim's location
 * */
app.get('/getJack', async (req, res) => {
    /* Implement the formula returns the dist between A and B*/
    const dal = new Dal()
    try {
        const victim = await dal.getVictimAsync();
    } catch (e) {

    }
})

app.delete('/evidences', async (req, res) => {
    const dal = new Dal();
    try {
        await dal.resetTableAsync();
        res.status(200).end();
    } catch (e) {
        res.status(400).set({ 'Content-Type': 'application/json' }).json(e)
    }
})

export default app
