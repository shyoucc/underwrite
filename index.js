var webpack = require( 'webpack' )
var WebpackDevServer = require( 'webpack-dev-server' )

var config = require( "./webpack.config.js" )

config.entry.app.unshift( "webpack-dev-server/client?http://localhost:8081/", "webpack/hot/dev-server" )

let compiler = webpack(config)

let server= new WebpackDevServer(compiler, {
    publicPath: '/assets/',
    hot: true,
    stats: {
        color: true
    }
})

server.listen(8081)
