const amerSportParse = require('../parsers/amerSportParse')
const streetBeatParse = require('../parsers/streetBeatParse')
const lacosteParse = require('../parsers/lacosteParse')


module.exports = function processingJSON(itemArr, storeNameStr) {

    return new Promise(resolve => {

        if (storeNameStr === 'amerSport') {
            amerSportParse(itemArr).then(resItemArr => resolve(resItemArr))
        }

        if (storeNameStr === 'streetBeat') {
            streetBeatParse(itemArr).then(resItemArr => resolve(resItemArr))
        }

        if (storeNameStr === 'lacoste') {
            lacosteParse(itemArr).then(resItemArr => resolve(resItemArr))
        }

        console.log('Processing JSON ok');

    })
}
