'use strict'

function getProducts(siteID, locale, productIDs) {
    try {        
        if (!locale || !siteID) return null;
        
        // Local
        const service = require('*/cartridge/services/scapiService');
        const getProductsService = service.products.get()

        const result = getProductsService.call({
            parameters: {
                ids: productIDs,
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
    getProducts: getProducts,
}