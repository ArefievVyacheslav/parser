const { MongoClient } = require('mongodb')
const client = new MongoClient('mongodb://localhost:27017/')
const download = require('image-downloader')

module.exports = async () => {
    try {
        await client.connect()
        console.log('connect');
        const ss = await client.db('ss')
        const all = await ss.collection('all')
        const productsArr = await all.find({}).toArray()
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
                { $set: { pictureServer: `https://sales-search.ru/prepare/${productObj.id}.webp` } })
        }
        console.log('CHANGE URL DONE!!!')
    } catch (e) {
        console.log(e);
    }
}
