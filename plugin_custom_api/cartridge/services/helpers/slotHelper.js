'use strict'

function callContentSlot(slotID, siteID, locale, accessToken, isCategorySlot) {
    if (!accessToken || !locale || empty(slotID) || !siteID) return null;

    const bearerToken = [accessToken.token_type, accessToken.access_token].join(' ');

    try {
        const service = require('*/cartridge/services/ocapiService');
        const contentSlot = isCategorySlot ? service.contentSlot.getCategory() : service.contentSlot.getGlobal()

        const response = contentSlot.call({
            urlAssets: {
                slotID: slotID,
                siteID: siteID,
            },
            parameters: {
                locale: locale,
            },
            headers: {
                Authorization: bearerToken
            }
        });

        const slot = response.object;
        return slot
    } catch (err) {
        return null
    }
}

function callContentSlots(slotIDs, siteID, locale, accessToken, categoryID) {
    if (!accessToken || !locale || empty(slotIDs) || !siteID) return null

    const results = [];
    const isCategorySlot = !!categoryID;
    slotIDs.forEach(slotID => {
        let result = callContentSlot(slotID, siteID, locale, accessToken, isCategorySlot);
        
        if (result) {
            if (isCategorySlot) {
                const slotConfigurations = result.slot_configurations || [];
                result.slot_configurations = slotConfigurations.length ? slotConfigurations.filter(config => {
                    return config.context_id === categoryID;
                }) : [];

                if (!empty(result.slot_configurations)) {
                    results.push(result);
                }                
            } else {
                results.push(result);
            }            
        }

    })

    return results;
}

module.exports = {
    callContentSlot: callContentSlot,
    callContentSlots: callContentSlots
}