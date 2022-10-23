const Auth = require('../helpers/Auth');
const DownloadTable = require('../helpers/DownloadTable')
const ParseCSVtoJSON = require('../helpers/ParseCSVtoJSON')
const ProcessingJSON = require('../helpers/ProcessingJSON')
const DBwrite = require('../helpers/DBwrite')

let token = null;
let productsArrJSON = [];



const lacoste = 'https://export.admitad.com/ru/webmaster/websites/2276598/products/export_adv_products/?template=66762&user=arefievvyacheslavspb%40gmail.com&code=btg1ajk9az&feed_id=7775';


(async function start() {                                                                                                    // Запуск парсер
    await Auth().then(tokenRes => token = tokenRes)                                                                         // Цикл по магазам
    await DownloadTable(lacoste, token, `${__dirname.slice(0, -6)}/tables/lacoste.csv`)                               // Скачана  таблица
    await ParseCSVtoJSON(`../tables/lacoste.csv`).then(productsArr => productsArrJSON = productsArr)                   // Конвертирую  JSON
    await ProcessingJSON(productsArrJSON, `lacoste`).then(productsJSON => productsArrJSON = productsJSON)     //  Обрабатываю  JSON
    await DBwrite('lacoste', productsArrJSON)
})()
