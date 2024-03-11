require('dotenv/config');
const fs = require('fs');
const MongoClient = require("mongodb").MongoClient;
const conversorDeTimestamp = require("../utils/conversorDeTimestamp");

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
    try {
        await client.connect();
        const db = client.db(dbName);

        const collection = db.collection(collectionName);
        const result = await collection.insertOne(objeto, { upsert: true });

        console.log('Mensagem salva com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar mensagem:', error);
    } finally {
        await client.close();
    }
}

async function numerosConsolidados() {
    try {
        await client.connect();

        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        const aggregationPipeline = [
            {
              $addFields: {
                authorPrefix: {
                  $cond: {
                    if: { $eq: ["$author", null] },
                    then: null,
                    else: { $arrayElemAt: [{ $split: ["$author", "@"] }, 0] }
                  }
                }
              }
            },
            {
              $group: {
                _id: "$authorPrefix",
                qtd: { $sum: 1 },
                nome: { $first: "$_data.notifyName" }
              }
            },
            {
              $project: {
                _id: 0,
                author: "$_id",
                qtd: 1,
                nome: {
                  $cond: {
                    if: { $eq: ["$nome", null] },
                    then: "Não disponível",
                    else: "$nome"
                  }
                }
              }
            }
          ];
          
          

        const result = await collection.aggregate(aggregationPipeline).toArray();

        console.log('Resultado da consolidação:');
        return result;
    } catch (error) {
        console.error('Erro ao consolidar os números:', error);
    } finally {
        await client.close();
    }
}

module.exports = {
    MongoConecta: MongoConecta,
    InsereChat: InsereChat,
    numerosConsolidados: numerosConsolidados
}