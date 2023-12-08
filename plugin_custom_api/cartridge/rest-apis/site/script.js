// Script Api
const Logger = require('dw/system/Logger');
const Status = require('dw/system/Status');
const CacheMgr = require('dw/system/CacheMgr');

exports.getSitePreferences = function (test) {
    // Local
    const _SETTINGS = require('*/cartridge/scripts/settings');
    const sitePreferenceApi = require('*/cartridge/scripts/api/sitePreference');

    const result = sitePreferenceApi()

    response.setContentType("application/json");
    response.getWriter().println(result);
    response.setExpires(Date.now() + _SETTINGS.CACHE.SITE_PREFERENCES);

    return new Status(Status.OK)
}

exports.getSitePreferences.public = true
