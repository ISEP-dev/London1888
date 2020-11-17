import Dal from "./dal";
import MathHelpers from "./math.helpers";

class London1888 {
    constructor() {
        this.dal = new Dal();
    }

    async getCitizensAsync() {
        return await this.dal.getVictimAsync();
    }

    async getVictimAsync() {
        return await this.dal.getVictimAsync();
    }

    getClosestCitizensFromVictim(victim, citizens) {
        const distanceByCitizens = citizens.map(c => ({
            citizen: c,
            distance: MathHelpers.getDistanceBetween(victim, c)
        }));

        const minDistanceFoundFromVictim = Math.min(...distanceByCitizens.map(dc => dc.distance));

        return distanceByCitizens
            .filter(dc => dc.distance === minDistanceFoundFromVictim)
            .map(dc => dc.citizen);
    }
}

const london1888 = new London1888();
export default london1888;
