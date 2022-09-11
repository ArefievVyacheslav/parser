const lacosteParse = require('../parsers/lacosteParse')
const elytsParse = require('../parsers/elytsParse')
const brandshopParse = require('../parsers/brandshopParse')
const vipavenueParse = require('../parsers/vipavenueParse')
// const amerSportParse = require('../parsers/amerSportParse')
// const streetBeatParse = require('../parsers/streetBeatParse')


module.exports = function processingJSON(itemArr, storeNameStr) {

    return new Promise(resolve => {

        if (storeNameStr === 'lacoste') {
            lacosteParse(itemArr).then(resItemArr => resolve(resItemArr))
        }

        if (storeNameStr === 'elyts') {
            elytsParse(itemArr).then(resItemArr => resolve(resItemArr))
        }

        if (storeNameStr === 'vipavenue') {
            vipavenueParse(itemArr).then(resItemArr => resolve(resItemArr))
        }

        if (storeNameStr === 'brandshop') {
            brandshopParse(itemArr).then(resItemArr => resolve(resItemArr))
        }

        // if (storeNameStr === 'streetBeat') {
        //     streetBeatParse(itemArr).then(resItemArr => resolve(resItemArr))
        // }

        // if (storeNameStr === 'amerSport') {
        //     amerSportParse(itemArr).then(resItemArr => resolve(resItemArr))
        // }

        console.log('Processing JSON ok');

    })
}
