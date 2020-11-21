import request from "supertest";
import app from "../app";

const expectedName = "Lucas"
const expectedPosX = "9"
const expectedPosY = "8"


let mockCreateVictim;
let mockHasAlreadyAVictim;


jest.mock("../dal.js", () => {
    return jest.fn().mockImplementation(() => ({
        createVictimAsync: mockCreateVictim,
        hasAlreadyAVictimAsync: mockHasAlreadyAVictim
    }))
})

describe("Victim tests", () => {
    it("Create a victim", async () => {
        mockHasAlreadyAVictim = jest.fn().mockReturnValue(false)
        mockCreateVictim = jest.fn().mockReturnValue({
            name: expectedName,
            posX: expectedPosX,
            posY: expectedPosY,
            isVictim: "1"
        })

        const res = await request(app).post(`/victim/${expectedName}/${expectedPosX}/${expectedPosY}`)

        expect(res.status).toBe(200)
        expect(res.body.name).toBe(expectedName)
        expect(res.body.posX).toBe(expectedPosX)
        expect(res.body.posY).toBe(expectedPosY)
        expect(mockHasAlreadyAVictim).toBeCalledTimes(1)
        expect(mockCreateVictim).toBeCalledTimes(1)
        expect(mockCreateVictim).toBeCalledWith(expectedName, expectedPosX, expectedPosY)

    })

    it("Cannot create a victim", async () => {
        mockHasAlreadyAVictim = jest.fn().mockReturnValue(true)
        mockCreateVictim = jest.fn()

        const res = await request(app).post(`/victim/${expectedName}/${expectedPosX}/${expectedPosY}`)


        expect(res.status).toBe(409)
        expect(mockHasAlreadyAVictim).toBeCalledTimes(1)
        expect(mockHasAlreadyAVictim).toReturnWith(true)
        expect(mockCreateVictim).not.toHaveBeenCalled()
    })
})