import mysql from 'mysql2/promise'

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
            console.error('Unable to connect to London1888 database')
            throw err
        }
    }

    async getAllCitizenAsync() {
        const connection = await this.connect()
        try {
            const [result] = await connection.query(`SELECT * FROM LondonCitizen WHERE isVictim=0 `)
            return result
        } catch (err) {
            throw err
        } finally {
            connection.end()
        }
    }

    async getClosestCitizenAsync() {
        const connection = await this.connect()
        try {
            const [result] = await connection.query(`SELECT * FROM LondonCitizen WHERE isVictim=0 `)
            return result
        } catch (err) {
            throw err
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
            throw err
        } finally {
            connection.end()
        }
    }

    async resetTableAsync() {
        const connection = await this.connect()
        try {
            await connection.query(`DELETE FROM LondonCitizen`)
        } catch (err) {
            throw err
        } finally {
            connection.end()
        }
    }
}

export default Dal
