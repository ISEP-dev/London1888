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

    async createCitizenAsync(name, posX, posY) {
        const connection = await this.connect()
        try {
            const [result] = await connection.query(`
                INSERT INTO LondonCitizen (name, posX, posY, isVictim) 
                VALUES ('${name}', '${posX}', '${posY}', '0')`)
            return {
                id: result.insertId,
                name: name,
                posX: posX,
                posY: posY,
                isVictim: 0
            }
        } finally {
            connection.end();
        }
    }

    async createVictimAsync(name, posX, posY) {
        const connection = await this.connect()
        try {
            const [result] = await connection.query(`
                INSERT INTO LondonCitizen (name, posX, posY, isVictim)
                VALUES ('${name}', '${posX}', '${posY}', '1')`)
            return {
                id: result.insertId,
                name: name,
                posX: posX,
                posY: posY,
                isVictim: 1
            }
        } finally {
            connection.end();
        }
    }

    async hasAlreadyAVictimAsync() {
        const connection = await this.connect()
        try {
            const [victimNumber] = await connection.query(`SELECT COUNT(id) as number from LondonCitizen WHERE isVictim='1'`)
            return victimNumber[0].number >= 1;
        } finally {
            connection.end();
        }
    }
}

export default Dal
