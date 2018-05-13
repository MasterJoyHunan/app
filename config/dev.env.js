'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    CDN: '"http://localhost/web/public/uploads/"',
    BASE_API: '""'
})
