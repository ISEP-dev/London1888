import mysql from 'mysql2/promise'
import UnavaibleError from "./errors/unavaible.error";

class Dal {
    async connect() {
        try {
            return await mysql.createConnection({
                host: '0.0.0.0',
                user: 'root',
                password: 'root',
                database: 'Db_London1888'
            })
        } catch (err) {
            throw new UnavaibleError();
        }
    }

    async getAllCitizenAsync() {
        const connection = await this.connect()
        try {
            const [result] = await connection.query(`SELECT * FROM LondonCitizen WHERE isVictim=0 `)
            return result
        } catch (err) {
            throw UnavaibleError();
        } finally {
            connection.end()
        }
    }

    async getVictimAsync() {
        const connection = await this.connect()
        try {
            const [result] = await connection.query(`SELECT * FROM LondonCitizen WHERE isVictim=1`)
            return result[0]
        } catch (err) {
            throw new UnavaibleError()
        } finally {
            connection.end()
        }
    }

    async resetTableAsync() {
        const connection = await this.connect()
        try {
            await connection.query(`DELETE FROM LondonCitizen`)
        } catch (err) {
            throw new UnavaibleError();
        } finally {
            connection.end()
        }
    }
}

export default Dal
