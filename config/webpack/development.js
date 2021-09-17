process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')
// Added to make webpack reload on html changes
const chokidar = require('chokidar')

environment.config.devServer.before = (app, server) => {
    chokidar.watch([
        'app/views/**/*.erb'
    ]).on('change', () => server.sockWrite(server.sockets, 'content-changed'))
}

module.exports = environment.toWebpackConfig()
