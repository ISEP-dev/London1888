import express from 'express'
import bodyParser from 'body-parser'
import Dal from "./dal";
import {getLondon1888} from "./london1888";

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

app.get('/getJack', async (req, res) => {
    const dal = new Dal();
    const victim = await dal.getVictimAsync();
    if (!victim) {
        return res.status(404).end();
    }

    const citizens = await dal.getAllCitizenAsync();
    if (!citizens.length) {
        return res.status(404).end();
    }

    const closestCitizens = getLondon1888().getClosestCitizensFromVictim(victim, citizens);
    if (closestCitizens.length > 1) {
        return res.status(409).end();
    }

    return res.status(200).set({ 'Content-Type': 'application/json' }).json(closestCitizens[0]);
})

app.delete('/evidences', async (req, res) => {
    const dal = new Dal();
    await dal.resetTableAsync();
    res.status(204).end();
})

export default app
