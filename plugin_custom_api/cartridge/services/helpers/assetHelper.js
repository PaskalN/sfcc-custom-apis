'use strict'

function getMultipleContentAssets(siteID, locale, accessToken, assetIDs) {
    const IDs = Array.isArray(assetIDs) ? assetIDs.join(',') : ''

    if (!accessToken || !locale || !siteID) return null;
    const bearerToken = [accessToken.token_type, accessToken.access_token].join(' ');

    try {
        const service = require('*/cartridge/services/ocapiService');
        const contentAssetsMultiple = service.contentAsset.getMultiple()
        const response = contentAssetsMultiple.call({
            urlAssets: {
                assetIDs: IDs,
                siteID: siteID
            },
            parameters: {                
                locale: locale,
            },
            headers: {
                Authorization: bearerToken
            }
        });

        const assets = response.object.data;
        return assets
    } catch (err) {
        return null
    }
}

module.exports = {
    getMultipleContentAssets: getMultipleContentAssets,
}