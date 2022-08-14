const { MongoClient } = require('mongodb')
const client = new MongoClient('mongodb://localhost:27017/');


module.exports = async function dbConnect(shop, productsArrJSON) {
    try {
        await client.connect()
        console.log('connect');
        const ss = await client.db('ss')
        const all = await ss.collection('all')
        await all.deleteMany({ shop: shop })
        await all.insertMany(productsArrJSON)
        await all.deleteMany({ picture: '' })
        console.log('DB write!');
    } catch (e) {
        console.log(e);
    }
}
