'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    CDN: '"http://twy4.web1.zwcat.cn/up_file/"',
    BASE_API: '""'
})
