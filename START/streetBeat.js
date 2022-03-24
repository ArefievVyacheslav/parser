const Auth = require('../helpers/Auth');
const DownloadTable = require('../helpers/DownloadTable')
const ParseCSVtoJSON = require('../helpers/ParseCSVtoJSON')
const ProcessingJSON = require('../helpers/ProcessingJSON')
const SaveToJSON = require('../helpers/SaveToJSON')


let token = null;
let productsArrJSON = [];


const streetBeat = 'https://export.admitad.com/ru/webmaster/websites/1545866/products/export_adv_products/?template=66490&user=arefievvyacheslavspb%40gmail.com&code=btg1ajk9az&feed_id=14032';


(async function start() {                                                                                                    // Запуск парсер
    await Auth().then(tokenRes => token = tokenRes)                                                                         // Доступен токен
    await DownloadTable(streetBeat, token, `${__dirname.slice(0, -6)}/tables/streetBeat.csv`)                         // Скачана  таблица
    await ParseCSVtoJSON(`./tables/streetBeat.csv`).then(productsArr => productsArrJSON = productsArr)                // Конвертирую  JSON
    await ProcessingJSON(productsArrJSON, `streetBeat`).then(productsJSON => productsArrJSON = productsJSON)  //  Обрабатываю  JSON                                                       //  Обрабатываю  JSON
    await SaveToJSON(`./results/streetBeat.json`, productsArrJSON)                                           // Создаю конечн. JSON
})()
