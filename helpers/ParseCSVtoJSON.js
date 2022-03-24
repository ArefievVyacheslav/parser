const fs = require('fs')
const csv = require('csv-parser')


const results = []


module.exports = function ParseCSVtoJSON(file) {
    return new Promise(resolve => {
        fs.createReadStream(file) // 'fileName.csv'
        .pipe(csv({ separator: ';' }))
        .on('data', (data) => results.push(data))
        .on('end', () => {

            resolve(results)
        });
    })
}
