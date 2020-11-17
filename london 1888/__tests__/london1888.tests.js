import {BASIC_CITIZEN, CLOSEST_CITIZEN, OTHER_BASIC_CITIZEN, SAME_CLOSEST_CITIZEN, VICTIM} from "../mocks/citizen.mock";
import {getLondon1888} from "../london1888";

describe('London 1888', () => {
    it('Get all closest citizen',() => {
        const citizens = [CLOSEST_CITIZEN, SAME_CLOSEST_CITIZEN, BASIC_CITIZEN, OTHER_BASIC_CITIZEN]

        const res = getLondon1888().getClosestCitizensFromVictim(VICTIM, citizens)
        expect(res).toEqual([CLOSEST_CITIZEN, SAME_CLOSEST_CITIZEN])
    })
    it('Get null when no citizens',() => {
        const res = getLondon1888().getClosestCitizensFromVictim(VICTIM, [])
        expect(res).toEqual([])
    })
})
