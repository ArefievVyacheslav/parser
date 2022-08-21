const { MongoClient } = require('mongodb')
const client = new MongoClient('mongodb://localhost:27017')
const fs = require('fs');

(async () => {
    try {
        // CONNECT DATABASE
        await client.connect()
        const db = await client.db('ss')
        const collection = await db.collection('all')
        const products = await collection.find({}).toArray()
        products.reverse().forEach((product, idx) => {
            const post = `${product.picture}\n${product.name}\nSALE ${product.sale}%\nSIZE ${product.params.size}\nold price: ${product.oldprice} rub.\nNEW PRICE: ${product.price} rub.\nlink ${product.url}\n`
            fs.appendFileSync('../posts.txt', post)
        })
    } catch (e) {
        console.log(e);
    }
})()
