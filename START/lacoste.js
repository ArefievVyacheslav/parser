// const { MongoClient } = require('mongodb')
const Auth = require('../helpers/Auth');
const DownloadTable = require('../helpers/DownloadTable')
const ParseCSVtoJSON = require('../helpers/ParseCSVtoJSON')
const ProcessingJSON = require('../helpers/ProcessingJSON')
const SaveToJSON = require('../helpers/SaveToJSON')
// const client = new MongoClient('mongodb://localhost:27017/');


let token = null;
let productsArrJSON = [];


const lacoste = 'https://export.admitad.com/ru/webmaster/websites/1545866/products/export_adv_products/?template=66761&user=arefievvyacheslavspb%40gmail.com&code=btg1ajk9az&feed_id=7775';


(async function start() {                                                                                                    // Запуск парсер
    await Auth().then(tokenRes => token = tokenRes)                                                                         // Цикл по магазам
    await DownloadTable(lacoste, token, `${__dirname.slice(0, -6)}/tables/lacoste.csv`)                               // Скачана  таблица
    await ParseCSVtoJSON(`./tables/lacoste.csv`).then(productsArr => productsArrJSON = productsArr)                   // Конвертирую  JSON
    await ProcessingJSON(productsArrJSON, `lacoste`).then(productsJSON => productsArrJSON = productsJSON)     //  Обрабатываю  JSON
    //  здесь будет запись в БД
    // await SaveToJSON(`./results/lacoste.json`, productsArrJSON);                                           // Создаю конечн. JSON
    // await (async function dbConnect() {
    //     try {
    //         await client.connect()
    //         console.log('connect');
    //         const ss = await client.db('sales-search')
    //         await ss.createCollection('products')
    //         const products = await ss.collection('products')
    //         await products.insertMany(productsArrJSON)
    //         console.log('done');
    //     } catch (e) {
    //         console.log(e);
    //     }
    // })();
})()


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
