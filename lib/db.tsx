import mysql from "serverless-mysql";

interface QueryType {
    query: string,
    values?: (string | number)[] | string | number
}

const dbConfig = {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
}

const sqlDb = mysql({
    config: dbConfig,
})

export default async function dbQuery({ query, values = [] }: QueryType) {

    try {
        const results = await sqlDb.query(query, values);
        await sqlDb.end();
        return results;
    } catch (error) {
        return {
            message: `Connection with ${dbConfig.database} failed! Error: ${error}`
        }
    }
}