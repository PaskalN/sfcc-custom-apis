// Script Api
const Logger = require('dw/system/Logger');
const Status = require('dw/system/Status');
const CacheMgr = require('dw/system/CacheMgr');
const RESTResponseMgr = require("dw/system/RESTResponseMgr");

exports.getSitePreferences = function (test) {
    // Local
    const _SETTINGS = require('*/cartridge/scripts/settings');
    const sitePreferenceApi = require('*/cartridge/scripts/api/sitePreference');

    const result = sitePreferenceApi()

    response.setContentType("application/json");
    response.setExpires(Date.now() + _SETTINGS.CACHE.SITE_PREFERENCES);
    RESTResponseMgr.createSuccess(result).render();

    return new Status(Status.OK)
}

exports.getSitePreferences.public = true
