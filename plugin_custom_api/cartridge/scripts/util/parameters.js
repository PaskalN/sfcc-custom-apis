'use strict';

function get(parameterName) {

    if (!parameterName) {
        return null
    }
    
    const params = request.httpParameterMap;
    const result = params[parameterName] && params[parameterName].value || null;

    if (/^\(.*\)/g.test(result)) {
        return result.replace(/[\(-\)]/g, '').split(',')
    }

    return result 
}

function getQuery(queryName) {
    const segment = get('c_segment') || 'global'
    return [queryName, segment].join('-')
}

module.exports = {
    get: get,
    getQuery: getQuery
}