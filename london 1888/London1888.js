import MathHelpers from "./math.helpers";

class London1888 {
    constructor() {
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
export let getLondon1888 = () => london1888;
