const fs = require('fs')
const { MongoClient } = require('mongodb')
const client = new MongoClient('mongodb://localhost:27017/')
const download = require('image-downloader')

module.exports = async (productsArr) => {
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
        const idErrorPictureArr = []
        for (const [idx, productObj] of productsArr.entries()) {
            const options = {
                url: productObj.picture,
                ExtractFilename: false,
                dest: `../../../brand-search-back/images/${productObj.id}.jpg`
            };
            await download.image(options).then(() => console.log(`${idx} download`)).catch(() => {
                console.log(`${idx} FAILED download`)
                idErrorPictureArr.push(productObj.id)
            });
        }
        for (const id of idErrorPictureArr) {
            await all.deleteOne({ id: id })
            console.log(`${id} have not image - DELETE from DB`)
        }
        const productsArrUpdate = await all.find({}).toArray()
        console.log('CHANGE IMAGE URL IN DB!!!')
        for (const productObj of productsArrUpdate) {
            await all.updateOne(
                { id: productObj.id },
                { $set: { pictureServer: `https://api.sales-search.ru/${productObj.id}.webp` } })
        }
        console.log('CHANGE URL DONE!!!')
    } catch (e) {
        console.log(e);
    }
}
