'use strict';
// Script Api
const Logger = require('dw/system/Logger');

module.exports = function(asString) {    
    try {
        // Local
        const assetHelper = require('*/cartridge/services/helpers/assetHelper');
        const parametersUtils = require('*/cartridge/scripts/util/parameters');
        const tokenHelper = require('*/cartridge/services/helpers/tokenHelper');

        // Parameters
        const assetIDs = parametersUtils.get('c_ids') || [];        
        const siteID = parametersUtils.get('siteId');
        const locale = parametersUtils.get('locale');

        const accessToken = tokenHelper.getAccessToken();
        const result = assetHelper.getMultipleContentAssets(siteID, locale, accessToken, assetIDs)
        
        if (!Array.isArray(result)) {
            return JSON.stringify({
                error: true
            });
        }        
        
        return asString ? JSON.stringify(result) : result;
    } catch (err) {
        Logger.error('ERROR: {0}', JSON.stringify(err));

        const errResult = {
            error: true,
            message: JSON.stringify(err)
        };

        return asString ? JSON.stringify(errResult) : errResult;
    }
}