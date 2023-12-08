'use strict';

// Script Api
const StringUtils = require('dw/util/StringUtils');
const System = require('dw/system/System');
const Logger = require('dw/system/Logger');
const LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

// Constant
const serviceLogger = Logger.getLogger('OcapyProxy', 'OcapyProxy');
const serviceName = 'OcapiProxy';
const ocapiVersion = 'v23_2';

const ocapiServices = {
    token: {
        get: () => {
            try {
                // Local
                const serviceConfig = require('*/cartridge/services/configurations/oauthToken');

                // Results
                const service = LocalServiceRegistry.createService(serviceName, serviceConfig);

                return service;
            } catch (err) {                
                serviceLogger.error('OCAPI Service ERROR: {0}', JSON.stringify(err))
                return () => {
                    return null
                }
            }
        }
    },
    contentSlot: {
        getGlobal: () => {
            try {
                // Local
                const serviceConfig = require('*/cartridge/services/configurations/contentSlot');
                
                // Results
                const service = LocalServiceRegistry.createService(serviceName, serviceConfig);
                
                return service;
            } catch (err) {                
                serviceLogger.error('OCAPI Service ERROR: {0}', JSON.stringify(err))
                return () => {
                    return null
                }
            }
        },
        getCategory: () => {
            try {
                // Local
                const serviceConfig = require('*/cartridge/services/configurations/contentCategorySlot');
                
                // Results
                const service = LocalServiceRegistry.createService(serviceName, serviceConfig);
                
                return service;
            } catch (err) {                
                serviceLogger.error('OCAPI Service ERROR: {0}', JSON.stringify(err))
                return () => {
                    return null
                }
            }
        }
    },
    contentAsset: {
        getMultiple: () => {
            try {
                // Local
                const serviceConfig = require('*/cartridge/services/configurations/contentAsset');
                
                // Results
                const service = LocalServiceRegistry.createService(serviceName, serviceConfig);
                
                return service;
            } catch (err) {
                serviceLogger.error('OCAPI Service ERROR: {0}', JSON.stringify(err))
                return () => {
                    return null
                }
            }
        }
    }
}

module.exports = ocapiServices