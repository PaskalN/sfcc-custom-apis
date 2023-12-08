'use strict';
// Script Api
const Logger = require('dw/system/Logger');


module.exports = function() {
    try {
        // Local
        const preference = require('*/cartridge/scripts/util/preference');

        const result = preference.getResult();

        return JSON.stringify(result);
    } catch (err) {
        Logger.error('ERROR: {0}', JSON.stringify(err));
        return JSON.stringify({
            error: true
        });
    }
}