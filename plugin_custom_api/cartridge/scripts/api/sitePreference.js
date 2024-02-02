'use strict';
// Script Api
const Logger = require('dw/system/Logger');


module.exports = function(asString) {
    try {
        // Local
        const preference = require('*/cartridge/scripts/util/preference');

        const result = preference.getResult();

        return asString ? JSON.stringify(result) : result;
    } catch (err) {
        Logger.error('ERROR: {0}', JSON.stringify(err));
        return JSON.stringify({
            error: true
        });
    }
}