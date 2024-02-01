'use strict'

function getOrganizationAssets() {
    
    const httpURL = request.httpURL.toString();
    const urlAssets = httpURL.replace('https://', '').split('/');
    const host = urlAssets[0];
    const shortCode = host.split('.')[0];
    const organizationID = urlAssets[5];
    const tenant = request.httpHost.split('.')[0]

    return {
        shortCode: shortCode,
        organizationID: organizationID,
        tenant: tenant
    }
}

function getScapiProductsUrl() {
    // Local
    const _SETTINGS = require('*/cartridge/scripts/settings');
    const organizationAssets = getOrganizationAssets();
    const urlAssets = [
        'https:/',
        [organizationAssets.shortCode, 'api.commercecloud.salesforce.com'].join('.'),
        'product',
        'shopper-products',
        _SETTINGS.VERTIONS.SCAPI,
        'organizations',
        organizationAssets.organizationID,
        'products'
    ];

    const url = urlAssets.join('/');
    return url;
}

function getScapiCategoryUrl() {
    // Local
    const _SETTINGS = require('*/cartridge/scripts/settings');
    const organizationAssets = getOrganizationAssets();
    const urlAssets = [
        'https:/',
        [organizationAssets.shortCode, 'api.commercecloud.salesforce.com'].join('.'),
        'product',
        'shopper-products',
        _SETTINGS.VERTIONS.SCAPI,
        'organizations',
        organizationAssets.organizationID,        
        'categories'
    ];

    const url = urlAssets.join('/');   
    return url;
}

module.exports = {
    getOrganizationAssets: getOrganizationAssets,
    getScapiProductsUrl: getScapiProductsUrl,
    getScapiCategoryUrl: getScapiCategoryUrl
}