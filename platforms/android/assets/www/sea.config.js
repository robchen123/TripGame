seajs.config({
    paths: {
        'spa': 'spa',
        'app': 'app'
    },
    alias: {
        '$': 'lib/jquery',
        'config': 'app/config/config.develop'
    },
    preload: ['$'],
    debug: true,
    map: [
        [".js", ".js?" + new Date().getTime()]
      ]
});