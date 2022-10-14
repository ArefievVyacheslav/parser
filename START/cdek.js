const DownloadTable = require('../helpers/DownloadTable')
const ParseCSVtoJSON = require('../helpers/ParseCSVtoJSON')
const ProcessingJSON = require('../helpers/ProcessingJSON')
const DBwrite = require('../helpers/DBwrite')


let productsArrJSON = [];


const cdek = 'https://feeds.advcake.com/feed/download/12cd4848d2efe8ddc0e783db996030b7';

(async function start() {
    await DownloadTable(cdek, '', `${__dirname.slice(0, -6)}/tables/cdek.csv`)                           // Скачана  таблица
    await ParseCSVtoJSON('../tables/cdek.csv').then(productsArr => productsArrJSON = productsArr)                // Конвертирую  JSON
    await ProcessingJSON(productsArrJSON, `cdek`).then(productsJSON => productsArrJSON = productsJSON)   //  Обрабатываю  JSON
    await DBwrite('cdek', productsArrJSON)
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
