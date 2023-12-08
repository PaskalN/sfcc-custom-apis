'use strict';

function isLocalized(value) {
    if (Array.isArray(value)) {
        return false
    }
    if (typeof value !== 'object') {
        return false
    }

    if ('_type' in value) {
        return false
    }

    return true
}

function isSimpleValue(value) {
    const localized = isLocalized(value)

    if (!localized) {
        if (typeof value !== 'object') {
            return true
        }

        if (Array.isArray(value)) {
            return true
        }

        return false
    }

    const keys = Object.keys(value)
    const localizedValue = value[keys[0]]

    if (typeof localizedValue !== 'object') {
        return true
    }

    if (Array.isArray(localizedValue)) {
        return true
    }

    return false
    
}

function getSimpleValue(value, incLocale) {
    const locale = incLocale || 'default'
    const localized = isLocalized(value)

    if (!localized) {
        return value
    }

    return value[locale] || value['default']
}

function extractValue(value, incLocale) {
    const locale = incLocale || 'default'

    if (isSimpleValue(value)) {
        return getSimpleValue(value, locale)
    }

    const localeValue = value[locale] || value['default']
    if (!localeValue) {
        return null
    }

    // CHECK FOR HTML
    if (localeValue._type === 'markup_text') {
        return localeValue.markup
    }
}

module.exports = {
    extractValue: extractValue
}