const amerSportParse = require('../parsers/amerSportParse')
const streetBeatParse = require('../parsers/streetBeatParse')


module.exports = function processingJSON(itemArr, storeNameStr) {

    return new Promise(resolve => {

        if (storeNameStr === 'amerSport') {
            amerSportParse(itemArr).then(resItemArr => resolve(resItemArr))
        }

        if (storeNameStr === 'streetBeat') {
            streetBeatParse(itemArr).then(resItemArr => resolve(resItemArr))
        }
    })
}
