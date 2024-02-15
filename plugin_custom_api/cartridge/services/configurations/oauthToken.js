'use strict'

function request(service, requestDataContainer) {
    const serviceUtils = require('*/cartridge/scripts/util/service');
    const serviceCredential = service.getConfiguration().getCredential();
    const encoding = require('dw/crypto/Encoding');
    const bytes = require('dw/util/Bytes');
    const rawToken = serviceCredential.user + ':' + serviceCredential.password;
    const token = 'Basic ' + encoding.toBase64(bytes(rawToken));

    const requestConfig = {
        url: 'https://account.demandware.com/dwsso/oauth2/access_token',
        method: 'POST',
        data: {},
        parameters: {
            client_id: serviceCredential.user,
            grant_type: 'client_credentials'
        },
        headers: {
            Authorization: token,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

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