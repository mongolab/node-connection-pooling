var connectionTotals = {};

module.exports = function (uri) {
    if (!connectionTotals[uri]) { connectionTotals[uri] = 0; }
    return {
        log: function log(message, object) { },
        error: function error(message, object) { },
        debug: function debug(message, object) {
            if (message === 'opened connection') {
                connectionTotals[uri]++;
                console.log('opened connection to ' + uri + ' (' + connectionTotals[uri] + ' total)' + ': ' + JSON.stringify(object));
            } else if (message ==='closed connection') {
                connectionTotals[uri]--;
                console.log('closed connection to ' + uri + ' (' + connectionTotals[uri] + ' total)');
            }
        },
        doDebug: true
    };
}

