import MathHelpers from "./math.helpers";
import Dal from "./dal";
import NotfoundError from "./errors/notfound.error";
import ConflictError from "./errors/conflict.error";
import Citizen from "./citizen";

class London1888 {
    constructor() {
    }

    async getVictimAsync() {
        const dal = new Dal();
        const victim = await dal.getVictimAsync();
        if (!victim && victim === undefined) {
            throw new NotfoundError("Sorry, no victim was found");
        }
        return victim;
    }

    async getAllCitizensAsync() {
        const dal = new Dal();
        const citizens = await dal.getAllCitizenAsync();
        if (!citizens.length) {
            throw new NotfoundError("Sorry, no citizen was found");
        }
        return citizens;
    }

    getClosestCitizensFromVictim(victim, citizens) {
        const distanceByCitizens = citizens.map(c => ({
            citizen: c,
            distance: MathHelpers.getDistanceBetween(victim, c)
        }));

        const minDistanceFoundFromVictim = Math.min(...distanceByCitizens.map(dc => dc.distance));

        const closestCitizens = distanceByCitizens
            .filter(dc => dc.distance === minDistanceFoundFromVictim)
            .map(dc => dc.citizen);

        if (closestCitizens.length > 1) {
            throw new ConflictError("Sorry but, we found many closest citizen..")
        }

        return closestCitizens;
    }

    async checkIfHasAlreadyAVictimAsync() {
        const dal = new Dal()

        const numberOfVictim = await dal.numberOfVictimAsync()
        if (numberOfVictim >= 1)
            throw new ConflictError()
    }

    async createCitizenAsync(name, posX, posY) {
        const dal = new Dal()

        const lastInsertId = await dal.createCitizenAsync(name, posX, posY)
        return new Citizen(lastInsertId, name, posX, posY, false)
    }

    async createVictimAsync(name, posX, posY) {
        const dal = new Dal()

        const lastInsertId = await dal.createVictimAsync(name, posX, posY)
        return new Citizen(lastInsertId, name, posX, posY, true)
    }
}

const london1888 = new London1888();
export let getLondon1888 = () => london1888;
