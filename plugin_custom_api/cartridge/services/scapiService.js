'use strict';

// Script Api
const StringUtils = require('dw/util/StringUtils');
const System = require('dw/system/System');
const Logger = require('dw/system/Logger');
const LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

// Constant
const serviceLogger = Logger.getLogger('ScapiProxy', 'ScapiProxy');
const serviceName = 'OcapiProxy';

const scapiServices = {
    products: {
        get: () => {
            try {
                // Local
                const serviceConfig = require('*/cartridge/services/configurations/products');

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
    category: {
        getMultiple: () => {
            try {
                // Local
                const serviceConfig = require('*/cartridge/services/configurations/category');

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

module.exports = scapiServices