import {BASIC_CITIZEN, CLOSEST_CITIZEN, OTHER_BASIC_CITIZEN, SAME_CLOSEST_CITIZEN, VICTIM} from "../mocks/citizen.mock";
import {getLondon1888} from "../london1888";
import ConflictError from "../errors/conflict.error";
import NotfoundError from "../errors/notfound.error";

const mockGetAllCitizensAsync = jest.fn();
const mockGetVictimAsync = jest.fn();

jest.mock('../dal.js', () => {
    return jest.fn().mockImplementation(() => ({
        getAllCitizenAsync: mockGetAllCitizensAsync,
        getVictimAsync: mockGetVictimAsync,
    }))
})

describe('London 1888', () => {
    it('Get all citizen : Done',async () => {
        try {
            const expectedResponse = [BASIC_CITIZEN, OTHER_BASIC_CITIZEN];
            mockGetAllCitizensAsync.mockReturnValue(expectedResponse);
            const res = await getLondon1888().getAllCitizensAsync();
            expect(res).toEqual(expectedResponse);
        } catch (e) {
            expect(true).toBeFalsy();
        }
    });
    it('Get all citizen : Throw not found',async () => {
        try {
            const expectedResponse = [];
            mockGetAllCitizensAsync.mockReturnValue(expectedResponse);
            await getLondon1888().getAllCitizensAsync();
        } catch (e) {
            expect(e).toBeInstanceOf(NotfoundError);
        }
    });

    it('Get victim : Done',async () => {
        try {
            const expectedResponse = VICTIM;
            mockGetVictimAsync.mockReturnValue(expectedResponse);
            const res = await getLondon1888().getVictimAsync();
            expect(res).toEqual(expectedResponse);
        } catch (e) {
            expect(true).toBeFalsy();
        }
    });
    it('Get victim : Throw not found',async () => {
        try {
            const expectedResponse = undefined;
            mockGetVictimAsync.mockReturnValue(expectedResponse);
            await getLondon1888().getVictimAsync();
        } catch (e) {
            expect(e).toBeInstanceOf(NotfoundError);
        }
    });

    it('Get closest citizen : done',() => {
        try {
            const citizens = [CLOSEST_CITIZEN, BASIC_CITIZEN, OTHER_BASIC_CITIZEN];
            const res = getLondon1888().getClosestCitizensFromVictim(VICTIM, citizens)[0];
            expect(res).toEqual(CLOSEST_CITIZEN);
        } catch (e) {
            expect(true).toBeFalsy();
        }
    });
    it('Get closest citizen : Throw conflict',() => {
        try {
            const citizens = [CLOSEST_CITIZEN, SAME_CLOSEST_CITIZEN, BASIC_CITIZEN, OTHER_BASIC_CITIZEN]
            getLondon1888().getClosestCitizensFromVictim(VICTIM, citizens)
        } catch (e) {
            expect(e).toBeInstanceOf(ConflictError);
        }
    });
})
