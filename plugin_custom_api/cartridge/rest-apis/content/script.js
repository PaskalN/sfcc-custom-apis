// Script Api
const Status = require('dw/system/Status');

exports.getContentSlot = function () {
    // Local
    const _SETTINGS = require('*/cartridge/scripts/settings');
    const globalSlotsApi = require('*/cartridge/scripts/api/globalSlots');

    const result = globalSlotsApi()

    response.setContentType("application/json");
    response.getWriter().println(result);
    response.setExpires(Date.now() + _SETTINGS.CACHE.CONTENT_SLOTS);

    return new Status(Status.OK)
}
exports.getContentSlot.public = true

exports.getCategoryContentSlot = function () {
    // Local
    const _SETTINGS = require('*/cartridge/scripts/settings');
    const categorySlotsApi = require('*/cartridge/scripts/api/categorySlots');

    const result = categorySlotsApi()

    response.setContentType("application/json");
    response.getWriter().println(result);
    response.setExpires(Date.now() + _SETTINGS.CACHE.CATEGORY_CONTENT_SLOTS);

    return new Status(Status.OK)
}
exports.getCategoryContentSlot.public = true

exports.getContentAssets = function () {
    // Local
    const _SETTINGS = require('*/cartridge/scripts/settings');
    const contentAssetApi = require('*/cartridge/scripts/api/contentAsset');

    const result = contentAssetApi()

    response.setContentType("application/json");
    response.getWriter().println(result);
    response.setExpires(Date.now() + _SETTINGS.CACHE.CONTENT_ASSETS);

    return new Status(Status.OK)
}
exports.getContentAssets.public = true
