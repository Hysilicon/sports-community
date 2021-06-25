const redis = require('redis');
const {redis_config} = require('../config/db_config');

const redisClient = redis.createClient(redis_config.port, redis_config.host);
redisClient.on('error', err =>{
    console.error(err); });

module.exports = redisClient;