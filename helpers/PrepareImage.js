const { MongoClient } = require('mongodb')
const client = new MongoClient('mongodb://localhost:27017')
const fs = require('fs')
const DownloadImage = require('image-downloader')

module.exports = async function getImage() {
    try {
        // CONNECT DATABASE
        await client.connect()
        const db = await client.db('ss')
        const collection = await db.collection('all')
        const productsArr = await collection.find({}).toArray()

        productsArr.forEach(productObj => {
            if (productObj.picture !== '' && productObj.picture.includes('lacoste')) {
                const options = {
                    url: productObj.picture,
                    dest: '../../images',
                }
                DownloadImage.image(options)
                    .then(({ filename }) => {
                        console.log('Saved to', filename); // saved to /path/to/dest/image.jpg
                    })
                    .catch((err) => console.error(err));
            }
        })
    } catch {}
}
