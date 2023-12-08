'use strict'

function request(service, requestDataContainer) {
    // Script Api
    const Site = require('dw/system/Site');

    // Local
    const _SETTINGS = require('*/cartridge/scripts/settings');
    const serviceUtils = require('*/cartridge/scripts/util/service')

    const currentSite = Site.getCurrent();
    const host = ['https', currentSite.httpsHostName].join('://');
    const urlPattern = '{host}/s/{site_id}/dw/shop/{version}/content/({ids})'

    const url = urlPattern
        .replace('{host}', host)
        .replace('{version}', _SETTINGS.VERTIONS.OCAPI)
        .replace('{site_id}', requestDataContainer.urlAssets.siteID)
        .replace('{ids}', requestDataContainer.urlAssets.assetIDs)

    const serviceCredential = service.getConfiguration().getCredential()

    const requestConfig = {
        url: url,
        method: 'GET',
        parameters: {
            client_id: serviceCredential.user
        }
    }

    serviceUtils.mergeConfigs(requestDataContainer, requestConfig)

    serviceUtils.setUrl(service, requestConfig)
    serviceUtils.setMethod(service, requestConfig)
    serviceUtils.setHeaders(service, requestConfig)
    serviceUtils.setParameters(service, requestConfig)
}

const config = {
    createRequest: function (service, requestDataContainer) {                
        const preRequest = request(service, requestDataContainer)
    },
    parseResponse: function (service, response) {
        if (response && response.statusCode === 200) {
            try {
                return JSON.parse(response.text)
            } catch (err) {
                serviceLogger.error('OCAPI Service oAuth ERROR: {0}', JSON.stringify(err))
                return null
            }
        }

        return null
    },
    mockCall: function (service, response) {}
}

module.exports = config