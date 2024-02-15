'use strict'

const serviceTools = {
    /**
     * @name setUrl
     * @description set the URL for the given generated LocalServiceRegistry
     *
     * @param {dw.svc.LocalServiceRegistry} service 
     * @param {object} preRequest 
     */
    setUrl: (service, preRequest) => {
        if (preRequest.url) {
            service.setURL(preRequest.url)
        }
    },

    /**
     * @name setPath
     * @description If the endpoint path is given instead of url - generate the url and set it
     *
     * @param {dw.svc.LocalServiceRegistry} service 
     * @param {object} preRequest 
     * @param {object} requestDataContainer 
     * @returns 
     */
    setPath: (service, preRequest, requestDataContainer) => {
        // Script Apu
        const Site = require('dw/system/Site');

        const currentSite = Site.getCurrent();

        if (!requestDataContainer || preRequest.url) {
            return
        }

        const host = ['https', currentSite.httpsHostName].join('://');
        let url = preRequest.path.replace('{host}', host)

        Object.keys(requestDataContainer).forEach(key => {
            const keySearch = ['{', key ,'}'].join('');
            if (~url.indexOf(keySearch)) {
                url = url.replace(keySearch, requestDataContainer[key])
            }
        })

        url = url.replace('{siteID}', currentSite.ID)
        service.setURL(url)
    },

    /**
     * @name setMethod
     * @desciption Set the method to the LocalServiceRegistry from the preRequest object
     *
     * @param {dw.svc.LocalServiceRegistry} service 
     * @param {object} preRequest 
     */
    setMethod: (service, preRequest) => {

        if (!preRequest.method) {
            return;
        }

        service.method = preRequest.method || 'GET'
        service.requestMethod = preRequest.method || 'GET'
    },

    /**
     * @name setHeaders
     * @desciption Set the headers to the LocalServiceRegistry from the preRequest object
     *
     * @param {dw.svc.LocalServiceRegistry} service 
     * @param {object} preRequest 
     */
    setHeaders: (service, preRequest) => {
        if (!preRequest.headers) {
            return;
        }

        Object.keys(preRequest.headers).forEach(headerName => {
            service.addHeader(headerName, preRequest.headers[headerName])
        })
    },

    /**
     * @name setParameters
     * @desciption Add parameters from to the request from both objects
     *
     * @param {dw.svc.LocalServiceRegistry} service 
     * @param {object} preRequest
     */
    setParameters: (service, preRequest) => {
        const preRequestParameters = preRequest ? preRequest.parameters : null;

        if (!preRequestParameters) {
            return
        }

        let parameters = []
        
        if (preRequestParameters) {
            Object.keys(preRequestParameters).forEach(headerName => {
                parameters.push([headerName, preRequestParameters[headerName]].join('='))
            })
        }        

        if (parameters.length) {
            const parameterString = parameters.join('&')
            service.setURL([service.URL, parameterString].join('?'))
        }
    },

    mergeConfigs: (baseConfig, requestConfig) => {
        if (typeof baseConfig === 'object') {

            if (baseConfig.url) {
                requestConfig.url = baseConfig.url;
            }
    
            if (baseConfig.method) {
                requestConfig.method = baseConfig.method;
            }
    
            if (baseConfig.parameters) {

                if (!('parameters' in requestConfig)) {
                    requestConfig.parameters = {}
                }

                Object.keys(baseConfig.parameters).forEach(key => {
                    requestConfig.parameters[key] = baseConfig.parameters[key];
                });
            }
    
            if (baseConfig.headers) {
                if (!('headers' in requestConfig)) {
                    requestConfig.headers = {}
                }

                Object.keys(baseConfig.headers).forEach(key => {
                    requestConfig.headers[key] = baseConfig.headers[key];
                });
            }
    
            if (baseConfig.data) {
                if (!('data' in requestConfig)) {
                    requestConfig.data = {}
                }

                Object.keys(baseConfig.data).forEach(key => {
                    requestConfig.data[key] = baseConfig.data[key];
                });
            }
        }
    }
}

module.exports = serviceTools