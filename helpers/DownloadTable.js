const fs = require('fs');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


module.exports = function downloadFile(url, token, path) {
    return new Promise(resolve => {
        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            }}).then(res => {
            res.body.pipe(fs.createWriteStream(path));

            setTimeout(() => resolve(), 1000)
        });
    })
}


// Using
// downloadFile('https://export.admitad.com/ru/webmaster/websites/1545866/products/export_adv_products/?feed_id=14032&code=btg1ajk9az&user=arefievvyacheslavspb%40gmail.com&template=66328',`${__dirname}/TTT.csv`)
//     .then(()=>console.log('OK'))
//     .catch(err=>console.error(err));
