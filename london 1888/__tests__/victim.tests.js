import request from "supertest";
import app from "../app";
import {VICTIM} from "../mocks/citizen.mock";

let mockCreateVictim;
let mockHasAlreadyAVictim;


jest.mock("../dal.js", () => {
    return jest.fn().mockImplementation(() => ({
        createVictimAsync: mockCreateVictim,
        numberOfVictimAsync: mockHasAlreadyAVictim
    }))
})

describe("Victim tests", () => {
    it("Create a victim", async () => {
        mockHasAlreadyAVictim = jest.fn().mockReturnValue(0)
        mockCreateVictim = jest.fn().mockReturnValue(VICTIM)

        const res = await request(app).post(`/victim/${VICTIM.name}/${VICTIM.posX}/${VICTIM.posY}`)

        expect(res.status).toBe(200)
        expect(res.body.name).toBe(VICTIM.name)
        expect(res.body.posX).toBe(VICTIM.posX.toString())
        expect(res.body.posY).toBe(VICTIM.posY.toString())
        expect(mockHasAlreadyAVictim).toBeCalledTimes(1)
        expect(mockCreateVictim).toBeCalledTimes(1)
        expect(mockCreateVictim).toBeCalledWith(VICTIM.name, VICTIM.posX.toString(), VICTIM.posY.toString())

    })

    it("Cannot create a victim", async () => {
        mockHasAlreadyAVictim = jest.fn().mockReturnValue(1)
        mockCreateVictim = jest.fn()

        const res = await request(app).post(`/victim/${VICTIM.name}/${VICTIM.posX}/${VICTIM.posY}`)


        expect(res.status).toBe(409)
        expect(mockHasAlreadyAVictim).toBeCalledTimes(1)
        expect(mockHasAlreadyAVictim).toReturnWith(1)
        expect(mockCreateVictim).not.toHaveBeenCalled()
    })
})