const fs = require('fs')
const axios = require('axios')
const DownloadImages = require('../helpers/DownloadImages')
const PrepareImages = require('../helpers/PrepareImages');

(async () => {
    fs.readdirSync('../../brand-search-back/prepareImages/').map(file => {
        fs.unlink(`../../brand-search-back/prepareImages/${file}`, err => {
            if (err) console.log(err)
        })
    });
    // fs.rm('../../brand-search-back/prepareImages',{ recursive: true }, () => {})
    const { data } = await axios.get('https://api.sales-search.ru/api/products')
    const productQuantity = data.quantity
    const pageProduct = +(productQuantity / 60).toFixed()
    const arrNumberToCount = Array(pageProduct).fill().map((e, i) => i + 1)

    for (let page of arrNumberToCount) {
        const { data } = await axios.get(`https://api.sales-search.ru/api/products?page-${page}=true&`)
        const products60 = data.products
        await DownloadImages(products60)
        await PrepareImages()
    }
    // await DownloadImages()
    // await PrepareImages()
})()
