const fs = require('fs')


module.exports = function SaveToJSON(fileNamePath, productArr) {
    return new Promise(resolve => {

        fs.writeFile(fileNamePath, `${JSON.stringify(productArr)}`, err => {
            if(err) return console.log(err);
        })

        resolve()
    })
}
