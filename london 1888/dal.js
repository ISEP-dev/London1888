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
