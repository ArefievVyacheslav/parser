const DownloadTable = require('../helpers/DownloadTable')
const ParseCSVtoJSON = require('../helpers/ParseCSVtoJSON')
const ProcessingJSON = require('../helpers/ProcessingJSON')
const DBwrite = require('../helpers/DBwrite')


let productsArrJSON = [];


const stockmann = 'https://feeds.advcake.com/feed/download/4c2a24d9d691f38fdbd04e6c7349fee5';

(async function start() {
    await DownloadTable(stockmann, '', `${__dirname.slice(0, -6)}/tables/stockmann.csv`)                           // Скачана  таблица
    await ParseCSVtoJSON('../tables/stockmann.csv').then(productsArr => productsArrJSON = productsArr)                // Конвертирую  JSON
    await ProcessingJSON(productsArrJSON, `stockmann`).then(productsJSON => productsArrJSON = productsJSON)   //  Обрабатываю  JSON
    await DBwrite('stockmann', productsArrJSON)
})();


// const { MongoClient } = require('mongodb')
// const client = new MongoClient('mongodb://localhost:27017/');
//
// (async () => {
//     try {
//         await client.connect()
//         console.log('connect');
//         const size42 = await client.db('sales-search')
//             .collection('products')
//             .find({
//                 'params.size': { $in: ['43'] }
//             })
//             .toArray()
//         console.log(size42);
//     } catch (e) {
//         console.log(e);
//
//     }
// })()
