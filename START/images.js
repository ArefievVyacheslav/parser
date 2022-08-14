const DownloadImages = require('../helpers/DownloadImages')
const PrepareImages = require('../helpers/PrepareImages');

(async () => {
    await DownloadImages()
    await PrepareImages()
})()
