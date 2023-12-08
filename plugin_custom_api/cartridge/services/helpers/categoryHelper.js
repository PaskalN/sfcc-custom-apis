'use strict'

function getCategories(siteID, locale, categoryIDs) {
    try {        
        if (!locale || !siteID) return null;
        
        // Local
        const service = require('*/cartridge/services/scapiService');
        const getCategoryService = service.category.getMultiple()

        const result = getCategoryService.call({
            parameters: {
                ids: categoryIDs,
                siteId: siteID,
                locale: locale,
            }
        });

        return result.object.data
    } catch (err) {
        return null
    }
}

module.exports = {
    getCategories: getCategories,
}