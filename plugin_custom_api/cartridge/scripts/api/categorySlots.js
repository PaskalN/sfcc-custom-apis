'use strict';
// Script Api
const Logger = require('dw/system/Logger');

// Local
module.exports = function() {    
    try {
        // Local
        const slotUtils = require('*/cartridge/scripts/util/slots');
        const parametersUtils = require('*/cartridge/scripts/util/parameters');
        const tokenHelper = require('*/cartridge/services/helpers/tokenHelper');
        const slotHelper = require('*/cartridge/services/helpers/slotHelper');

        // Parameters
        const slotIds = parametersUtils.get('c_ids') || [];
        const categoryId = parametersUtils.get('c_category') || [];
        const siteID = parametersUtils.get('siteId');
        const locale = parametersUtils.get('locale');

        const accessToken = tokenHelper.getAccessToken();
        const slots = slotHelper.callContentSlots(slotIds, siteID, locale, accessToken, categoryId);

        if (!Array.isArray(slots)) {
            return JSON.stringify({
                error: true
            });
        }
        
        const result = slotUtils.parseSlots(slots, locale, siteID, accessToken)
        return JSON.stringify(result);
    } catch (err) {
        Logger.error('ERROR: {0}', JSON.stringify(err));
        return JSON.stringify({
            error: true,
            message: JSON.stringify(err)
        });
    }
}