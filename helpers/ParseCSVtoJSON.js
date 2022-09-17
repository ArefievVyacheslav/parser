const fs = require('fs')
const csv = require('csv-parser')

const results = []

module.exports = function ParseCSVtoJSON(file) {
    return new Promise(async resolve => {
        await fs.createReadStream(file) // 'fileName.csv'
            .pipe(csv({ separator: ';' })
            ).on('data', async data => {
                results.push(data)
            }).on('end', () => {
                setTimeout(() => {
                    console.log('ParseCSV ok', results.length);
                    resolve(results)
                }, 10000)
            });
    })
}
