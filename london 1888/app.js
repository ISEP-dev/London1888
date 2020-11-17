import express from 'express'
import bodyParser from 'body-parser'
import Dal from "./dal";
import {getLondon1888} from "./london1888";
import UnavaibleError from "./errors/unavaible.error";
import NotfoundError from "./errors/notfound.error";
import ConflictError from "./errors/conflict.error";

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

app.post('/citizen/:name/:posX/:posY', async (req, res) => {
    const {name, posX, posY} = req.params;
    const dal = new Dal()
    try {
        const result = await dal.createCitizen(name, posX, posY)
        console.log(result)
    } catch (e) {
        console.error(e)
    }


})

app.post('/victim/:name/:posX/:posY', (req, res) => {
    const {name, posX, posY} = req.params;

})

app.get('/getJack', async (req, res) => {
    try {
        const victim = await getLondon1888().getVictimAsync();
        const citizens = await getLondon1888().getAllCitizensAsync();
        const closestCitizens = getLondon1888().getClosestCitizensFromVictim(victim, citizens);
        return res.status(200).set({ 'Content-Type': 'application/json' }).json(closestCitizens[0]);
    } catch (err) {
        if (err instanceof UnavaibleError) {
            return res.status(err.status).send(err.message).end();
        } else if (err instanceof NotfoundError) {
            return res.status(err.status).send(err.message).end();
        } else if (err instanceof ConflictError) {
            return res.status(err.status).send(err.message).end();
        }
    }
})

app.delete('/evidences', async (req, res) => {
    try {
        const dal = new Dal();
        await dal.resetTableAsync();
        res.status(204).end();
    } catch (err) {
        if (err instanceof UnavaibleError)
            return res.status(err.status).send(err.message).end();
    }
})

export default app
