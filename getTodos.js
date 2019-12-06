
import PgConnection from "postgresql-easy";
import dbConfig from "./db";

export async function main(event, context) {
    const db = new PgConnection(dbConfig);

    db.getAll('todo')
        .then(res => {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(res)
            })
        })
        .catch(e => {
            console.log(e);
            callback(null, {
                statusCode: e.statusCode || 500,
                body: 'Error: Could not find Todos: ' + e
            })
        })

}