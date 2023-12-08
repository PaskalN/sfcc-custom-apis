'use strict';

// Local
const customPreferences = require('*/cartridge/scripts/util/customPreferences');

function hydrateContent(result, locale, siteId, token) {
    const assetHelper = require('*/cartridge/services/helpers/assetHelper');
    const productHelper = require('*/cartridge/services/helpers/productHelper');
    const categoryHelper = require('*/cartridge/services/helpers/categoryHelper');
    const tokenHelper = require('*/cartridge/services/helpers/tokenHelper');

    const shopperToken = tokenHelper.getShopperToken()

    if (result.type.content_assets) {
        result.content_assets_ids = assetHelper.getMultipleContentAssets(siteId, locale, token, result.content_assets_ids || []) || null;
    }

    if (result.type.products) {
        const products = productHelper.getProducts(siteId, locale, result.products_ids);
        if (shopperToken) {
            result.products_ids = products;
        }
    }

    if (result.type.categories) {
        const categories = categoryHelper.getCategories(siteId, locale, result.category_ids);
        if (shopperToken) {
            result.category_ids = categories;
        }
    }
}

function isActiveDefaultSchedule(configuration) {
    const information = configuration.assignment_information
    return !!configuration.schedule && information.schedule_type === "none" ? ['defaultSchedule'] : []
}

function getSheduledList(configuration) {

    const defaultSchedule = isActiveDefaultSchedule(configuration)
    if (!empty(defaultSchedule)) {
        return defaultSchedule
    }

    const assignmentInformation = configuration.assignment_information;
    if (empty(assignmentInformation)) {
        return []
    }
    const activeCampaigns = assignmentInformation.active_campaign_assignments;

    if (empty(activeCampaigns) || empty(assignmentInformation)) {
        return []
    }

    const campaignSchedule = Array.isArray(activeCampaigns) ?
    assignmentInformation.active_campaign_assignments.map(campaign => {
        return campaign.campaign_id
    }) : []

    return campaignSchedule
}

function updateResultWithCustomAttributes(result, configuration, incLocale) {
    const locale = incLocale || 'default'

    if (!result || !configuration) return null

    Object.keys(configuration).forEach(key => {
        if (/^c_/.test(key)) {
            result[key] = customPreferences.extractValue(configuration[key], locale)
        }
    });
}

function getSlotContent(configuration, incLocale, siteId, token) {
    const locale = incLocale || 'default'
    const slotContent = configuration.slot_content

    // Product
    const isProducts = slotContent.type === 'products'
    const productIds = slotContent.product_ids || []

    // Categories
    const isCategories = slotContent.type === 'categories'
    const categoryIds = slotContent.category_ids || []

    // Content Assets
    const isContentAssets = slotContent.type === 'content_assets'
    const contentAssetsIds = slotContent.content_asset_ids || []

    // HTML
    const isHtml = slotContent.type === 'html'
    const htmlMarkup = isHtml && slotContent.body ? customPreferences.extractValue(slotContent.body, locale) : ''

    // Recommendation
    const isRecommendation = slotContent.type === 'recommended_products'
    const recommender = isRecommendation ? customPreferences.extractValue(slotContent.body, locale) : null

    const result = {
        type: {
            products: isProducts,
            categories: isCategories,
            content_assets: isContentAssets,
            html: isHtml,
            recommendation: isRecommendation
        },

        products_ids: productIds,
        category_ids: categoryIds,
        content_assets_ids: contentAssetsIds,
        html: htmlMarkup,
        recommender: recommender
    }

    hydrateContent(result, incLocale, siteId, token);

    return result
}

function getAvailableSlotConfigurations(slot, locale, siteId, token) {   

    if (!slot || empty(slot.slot_configurations)) {
        return null;
    }

    const configurations = slot.slot_configurations;
    const finalConfigurations = configurations.map(configuration => {

        let scheduledList = getSheduledList(configuration);
        let hasScheduledList = !empty(scheduledList);
        const available = hasScheduledList && configuration.enabled;

        if (!available) {
            return null;
        }

        let content = getSlotContent(configuration, locale, siteId, token)
        let calloutMsgValue = customPreferences.extractValue(configuration.callout_msg, locale)

        let result = { 
            available: available,
            slot_id: slot.slot_id,
            default: configuration.default,
            context_type: slot.context_type,
            configuration_id: configuration.configuration_id,
            tempalte: configuration.template,
            scheduled_list: scheduledList,
            content: content,
            callout_msg: calloutMsgValue ? calloutMsgValue.markup : ''
        };

        updateResultWithCustomAttributes(result, configuration, locale)

        return result;

    }).filter(configurations => {
        return !empty(configurations);
    });

    return finalConfigurations
}

function parseSlots(slots, locale, siteId, token) {
    const currentSlots = slots || [];
    const result = {};

    currentSlots.forEach(slot => {
        result[slot.slot_id] = getAvailableSlotConfigurations(slot, locale, siteId, token);
    });

    return result;
}

module.exports = {
    parseSlots: parseSlots
};