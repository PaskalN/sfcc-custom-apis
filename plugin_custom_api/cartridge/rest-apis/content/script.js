// Script Api
const Status = require('dw/system/Status');
const RESTResponseMgr = require("dw/system/RESTResponseMgr");

exports.getContentSlot = function () {
    // Local
    const _SETTINGS = require('*/cartridge/scripts/settings');
    const globalSlotsApi = require('*/cartridge/scripts/api/globalSlots');

    const result = globalSlotsApi()

    response.setVaryBy("price_promotion");
    response.setContentType("application/json");
    response.setExpires(Date.now() + _SETTINGS.CACHE.CONTENT_SLOTS);    
    RESTResponseMgr.createSuccess(result).render();

    return new Status(Status.OK)
}
exports.getContentSlot.public = true

exports.getCategoryContentSlot = function () {
    // Local
    const _SETTINGS = require('*/cartridge/scripts/settings');
    const categorySlotsApi = require('*/cartridge/scripts/api/categorySlots');

    const result = categorySlotsApi()

    response.setVaryBy("price_promotion");
    response.setContentType("application/json");    
    response.setExpires(Date.now() + _SETTINGS.CACHE.CATEGORY_CONTENT_SLOTS);
    RESTResponseMgr.createSuccess(result).render();

    return new Status(Status.OK)
}
exports.getCategoryContentSlot.public = true

exports.getContentAssets = function () {
    // Local
    const _SETTINGS = require('*/cartridge/scripts/settings');
    const contentAssetApi = require('*/cartridge/scripts/api/contentAsset');

    const result = contentAssetApi()

    response.setContentType("application/json");
    response.setExpires(Date.now() + _SETTINGS.CACHE.CONTENT_ASSETS);
    RESTResponseMgr.createSuccess(result).render();

    return new Status(Status.OK)
}
exports.getContentAssets.public = true
