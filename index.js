const Auth = require('./helpers/Auth');
const DownloadTable = require('./helpers/DownloadTable')
const ParseCSVtoJSON = require('./helpers/ParseCSVtoJSON')
const ProcessingJSON = require('./helpers/ProcessingJSON')
const SaveToJSON = require('./helpers/SaveToJSON')


let token = null;
let productsArrJSON = [];


const stores = {
    amerSport: 'https://export.admitad.com/ru/webmaster/websites/1545866/products/export_adv_products/?template=66340&user=arefievvyacheslavspb%40gmail.com&code=btg1ajk9az&feed_id=18974',
    streetBeat: 'https://export.admitad.com/ru/webmaster/websites/1545866/products/export_adv_products/?template=66490&user=arefievvyacheslavspb%40gmail.com&code=btg1ajk9az&feed_id=14032'
};


(async function start() {                                                                                                       // Запуск парсер
    await Auth().then(tokenRes => token = tokenRes)                                                                            // Доступен токен
    await DownloadTable(stores[store], token, `${__dirname}/tables/${store}.csv`)                                        // Скачана  таблица
    await ParseCSVtoJSON(`./tables/${store}.csv`).then(productsArr => productsArrJSON = productsArr)                     // Конвертирую  JSON
    await ProcessingJSON(productsArrJSON, `${store}`).then(productsJSON => productsArrJSON = productsJSON)       //  Обрабатываю  JSON                                                       //  Обрабатываю  JSON
    await SaveToJSON(`./results/${store}.json`, productsArrJSON)                                                // Создаю конечн. JSON
})()



// НАПИСАТЬ ПРЕОБРАЗОВАТЕЛИ ИСХОДНЫХ JSON В НУЖНЫЙ
// ФОРМАТ В ЗАВИСИМОСТИ ОТ МАГАЗИНА
//
// ОБЕРНУТЬ ВСЕ В TRY/CATCH
//
//
//
//
// РЕАЛИЗОВАТЬ ВЫКАЧКУ КАРТИНОК В ОТДЕЛЬНОЙ ФУНКЦИИ
//
// ВНЕСТИ ВСЕ МАГАЗИНЫ И ССЫЛКИ В ОБЪЕКТ STORES
//
// СДЕЛАТЬ ПО ИТОГУ ОБЪЕКТ
// КЛЮЧАМИ КОТОРОГО БУДЕТ НАЗВАНИЕ МАГАЗИНА
// А ЗНАЧЕНИЕМ БУДЕТ МАССИВ ОБЪЕКТОВ ТОВАРОВ
