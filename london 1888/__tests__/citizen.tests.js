import request from "supertest";
import app from "../app";

const expectedName = "Lucas"
const expectedPosX = "5"
const expectedPosY = "8"

const mockCreateCitizen = jest.fn().mockReturnValue({
    name: expectedName,
    posX: expectedPosX,
    posY: expectedPosY,
    isVictim: "0"
})

jest.mock("../dal.js", () => {
    return jest.fn().mockImplementation(() => ({
        createCitizen: mockCreateCitizen
    }))
})

describe("Citizen tests", () => {
    it("Create a citizen", async () => {

        const res = await request(app).post(`/citizen/${expectedName}/${expectedPosX}/${expectedPosY}`)

        expect(res.status).toBe(200)
        expect(res.body.name).toBe(expectedName)
        expect(res.body.posX).toBe(expectedPosX)
        expect(res.body.posY).toBe(expectedPosY)
        expect(mockCreateCitizen).toBeCalledTimes(1)
        expect(mockCreateCitizen).toBeCalledWith(expectedName, expectedPosX, expectedPosY)

    })
})