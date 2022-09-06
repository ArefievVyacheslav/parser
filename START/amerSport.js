const Auth = require('../helpers/Auth');
const DownloadTable = require('../helpers/DownloadTable')
const ParseCSVtoJSON = require('../helpers/ParseCSVtoJSON')
const ProcessingJSON = require('../helpers/ProcessingJSON')
const DBwrite = require('../helpers/DBwrite')


let token = null;
let productsArrJSON = [];


const amerSport = 'https://export.admitad.com/ru/webmaster/websites/2276598/products/export_adv_products/?template=66341&user=arefievvyacheslavspb%40gmail.com&code=btg1ajk9az&feed_id=18974';

(async function start() {                                                                                                    // Запуск парсер
    await Auth().then(tokenRes => token = tokenRes)                                                                         // Цикл по магазам
    await DownloadTable(amerSport, token, `${__dirname.slice(0, -6)}/tables/amerSport.csv`)                           // Скачана  таблица
    await ParseCSVtoJSON('../tables/amerSport.csv').then(productsArr => productsArrJSON = productsArr)                // Конвертирую  JSON
    await ProcessingJSON(productsArrJSON, `amerSport`).then(productsJSON => productsArrJSON = productsJSON)   //  Обрабатываю  JSON
    await DBwrite('amerSport', productsArrJSON)
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
