'use strict';

// Script Api
const Site = require('dw/system/Site');
const Logger = require('dw/system/Logger');

// Local
const parameters = require('*/cartridge/scripts/util/parameters');

const _PARSER_TYPES = {
    SIMPLE: 0,
    JSON: 1
};

function getPreferenceValue(preference) {
    const type = typeof preference;
    const fallbackDefaultValue = null;

    if (!!~['string', 'number', 'boolean'].indexOf(type)) {
        return preference || fallbackDefaultValue;
    }

    if (typeof preference === 'object' && preference.value) {
        return preference.value || fallbackDefaultValue;
    }

    return fallbackDefaultValue;
}

function getCustomPrefValue(site, pref) {

    if (!pref || typeof pref !== 'object') {
        return null;
    }

    const fallbackDefaultValue = null;
    const fallbackValue = pref.fallbackValue || fallbackDefaultValue;

    const id = pref.id || fallbackDefaultValue;
    const parserType = pref.type ? pref.type.toUpperCase() : null;
    const pareser = _PARSER_TYPES[(parserType || 'SIMPLE')];

    try {
        const value = getPreferenceValue(site.getCustomPreferenceValue(id));

        if (pareser === _PARSER_TYPES.SIMPLE) {
            return value || fallbackValue;
        }
        
        if (pareser === _PARSER_TYPES.JSON) {
            return JSON.parse(value) || fallbackValue;
        }

        return fallbackValue;
    } catch (err) {
        Logger.error('ERROR: {0}', JSON.stringify(err));
        return fallbackValue;
    }
}

function isValidConfig(config)  {
    let valid = true;

    if (typeof config !== 'object' || Array.isArray(config)) {
        return false;
    }

    Object.keys(config).forEach(key => {
        let configSegment = config[key];

        if (typeof configSegment !== 'object' || !Array.isArray(configSegment)) {
            valid = false;
        } else {
            const failedResult = configSegment.find(segmentAsset => typeof segmentAsset !== 'object' || Array.isArray(segmentAsset))
            if (failedResult) {
                valid = false;
            }
        }
    });

    return valid;
}

function getConfig(site) {

    const configAttributeId = 'pwa-site-preferences-map'

    try {
        const configStringValue = site.getCustomPreferenceValue(configAttributeId);
        const config = JSON.parse(configStringValue);

        if (isValidConfig(config)) {
            return config;
        }

        return {
            global: {}
        };

    } catch (err) {
        Logger.error('ERROR: {0}', JSON.stringify(err));

        return {
            global: {}
        };
    }
}

function getSegment() {
    const currentSite = Site.getCurrent();
    const config = getConfig(currentSite);
    const segment = parameters.get('c_segment') || 'global';
    const selectedSegment = config[segment] || [];

    return selectedSegment;
}

function getResult() {
    const currentSite = Site.getCurrent();
    const segment = getSegment();

    let data = {};

    segment.forEach(pref => {
        const result = getCustomPrefValue(currentSite, pref);
        data[pref.id] = result || null;
    });

    return data;
}

module.exports = {
    _PARSER_TYPES: _PARSER_TYPES,
    getCustomPrefValue: getCustomPrefValue,
    getConfig: getConfig,
    getSegment: getSegment,
    getResult: getResult
};