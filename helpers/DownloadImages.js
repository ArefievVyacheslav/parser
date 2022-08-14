const fs = require('fs')
const { MongoClient } = require('mongodb')
const client = new MongoClient('mongodb://localhost:27017/')
const download = require('image-downloader')

module.exports = async () => {
    try {
        fs.readdirSync('../../brand-search-back/images').map(file => {
            fs.unlink(`../../brand-search-back/images/${file}`, err => {
                if (err) console.log(err)
            })
        });
        await client.connect()
        console.log('connect');
        const ss = await client.db('ss')
        const all = await ss.collection('all')
        const productsArr = await all.find({}).toArray()
        const idErrorPictureArr = []
        for (const productObj of productsArr) {
            const options = {
                url: productObj.picture,
                ExtractFilename: false,
                dest: `../../../brand-search-back/images/${productObj.id}.jpg`
            };
            await download.image(options).catch(() => idErrorPictureArr.push(productObj.id));
        }
        for (const id of idErrorPictureArr) {
            await all.deleteOne({ id: id })
        }
        let productsArrUpdate = await all.find({}).toArray()
        productsArrUpdate = productsArrUpdate.map(productObj => productObj.picture = `https://sales-search.ru/prepare/${productObj.id}.webp`)
        await all.insertMany(productsArrUpdate)
    } catch (e) {
        console.log(e);
    }
}
