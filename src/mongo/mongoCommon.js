require('dotenv/config');
const fs = require('fs');
const MongoClient = require("mongodb").MongoClient;
const conversorDeTimestamp = require("../utils/conversorDeTimestamp");

function MongoConecta() {
    const {
        APP_URL,
        APP_PORT,
        DB_DATABASE,
        DB_HOSTNAME,
        DB_PORT,
        DB_USERNAME,
        DB_PASSWORD
    } = process.env;

    MongoClient.connect(
        `mongodb://${DB_HOSTNAME}:${DB_PORT}/${DB_DATABASE}`)
        .then(result => {
            console.log(`${conversorDeTimestamp.obterDataFormatada()} - MongoDB Connected`);
        })
        .catch(error => {
            console.log(`${conversorDeTimestamp.obterDataFormatada()} - MongoDB Fail`);
        });
}

async function InsereChat(objeto) {

    const {
        APP_URL,
        APP_PORT,
        DB_DATABASE,
        DB_HOSTNAME,
        DB_PORT,
        DB_USERNAME,
        DB_PASSWORD
    } = process.env;

    const client = new MongoClient(`mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOSTNAME}:${DB_PORT}/${DB_DATABASE}`);
    const dbName = DB_DATABASE;
    const collectionName = 'wsmessags';

    try {
        await client.connect();
        const db = client.db(dbName);

        const collection = db.collection(collectionName);
        const result = await collection.insertOne(objeto, { upsert: true });

        console.log('Objeto salvo com sucesso!');
        console.log('ID do objeto:', result.insertedId);
    } catch (error) {
        console.error('Erro ao salvar objeto:', error);
    } finally {
        await client.close();
    }
}

module.exports = {
    MongoConecta: MongoConecta,
    InsereChat: InsereChat
}