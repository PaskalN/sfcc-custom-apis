'use strict'

function callAccessToken() {
    try {
        const service = require('*/cartridge/services/ocapiService');    
        const getToken = service.token.get()
        const response = getToken.call();

        const token = response.object;
        token.expires_in_timestamp = token.expires_in * 1000 + Date.now()

        return token
    } catch (err) {
        return null
    }
}

function getAccessToken () {
    const CacheMgr = require('dw/system/CacheMgr')
    const cache = CacheMgr.getCache('AccessToken');

    const token = cache.get('access_token_ocapi', () => {
        return callAccessToken();
    })

    if (!token || token.expires_in_timestamp < Date.now()) {
        const newToken = callAccessToken()
        cache.put('access_token_ocapi', newToken)
        return newToken
    }

    return token;
}

function getShopperToken() {
    const parameters = require('*/cartridge/scripts/util/parameters');
    const headers = request.httpHeaders;

    const shopperTokenHeader = headers.get('shopper-token')
    const shopperTokenParameter = parameters.get('c_shopper_token')

    return shopperTokenHeader || shopperTokenParameter
}

module.exports = {
    getAccessToken: getAccessToken,
    getShopperToken: getShopperToken
}