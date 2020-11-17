import request from "supertest";
import app from "../app";

const mockResetTableAsync = jest.fn()

jest.mock('../dal.js', () => {
    return jest.fn().mockImplementation(() => ({
        resetTableAsync: mockResetTableAsync,
    }))
})

describe('Evidences action', () => {
    it('Reset table', async () => {
        const res = await request(app).delete(`/evidences`);
        expect(res.status).toBe(204)
        expect(mockResetTableAsync).toHaveBeenCalledTimes(1);
    })
})
