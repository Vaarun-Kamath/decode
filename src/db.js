import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0
});

export async function executeQuery(query, values) {

    let db;
    try {
        db = await pool.getConnection();
        const [results] = await db.execute(query, values);
        console.log(results);
        db.release();

        return { success: true, results };
    } catch (error) {
        console.error("Error executing MySQL query:", error);
        if(db) {
            db.release()
        }
        return { success: false, error: error };
    }
}