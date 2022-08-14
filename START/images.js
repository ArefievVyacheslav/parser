const fs = require('fs')
const DownloadImages = require('../helpers/DownloadImages')
const PrepareImages = require('../helpers/PrepareImages');

(async () => {
    fs.readdirSync('../../brand-search-back/images').map(file => {
        fs.unlink(`../../brand-search-back/images/${file}`, err => {
            if (err) console.log(err)
        })
    });
    fs.rm('../../brand-search-back/images/prepare',{ recursive: true }, () => {})
    await DownloadImages()
    await PrepareImages()
})()
