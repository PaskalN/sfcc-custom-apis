'use strict'

function request(service, requestDataContainer) {
    // Script Api
    const Site = require('dw/system/Site');

    // Local
    const scapi = require('*/cartridge/scripts/util/scapi');
    const token = require('*/cartridge/services/helpers/tokenHelper');
    const serviceUtils = require('*/cartridge/scripts/util/service');

    const url = scapi.getScapiProductsUrl();
    const shopperToken = token.getShopperToken();

    const requestConfig = {
        url: url,
        method: 'GET',
        headers: {
            Authorization: shopperToken
        }
    };

    serviceUtils.mergeConfigs(requestDataContainer, requestConfig);
    serviceUtils.setUrl(service, requestConfig);
    serviceUtils.setMethod(service, requestConfig);
    serviceUtils.setHeaders(service, requestConfig);
    serviceUtils.setParameters(service, requestConfig);
}

const config = {
    createRequest: function (service, requestDataContainer) {                
        const preRequest = request(service, requestDataContainer);
    },
    parseResponse: function (service, response) {
        if (response && response.statusCode === 200) {
            try {
                return JSON.parse(response.text);
            } catch (err) {
                serviceLogger.error('OCAPI Service oAuth ERROR: {0}', JSON.stringify(err));
                return null;
            }
        }

        return null;
    },
    mockCall: function (service, response) {}
}

module.exports = config;