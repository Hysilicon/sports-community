let mysql_config = {
    host: 'localhost',
    user: 'root',
    password:'',
    port:'3306',
    database:'202-community'
}

let redis_config = {
    port: 6379,
    host:'127.0.0.1'
}

module.exports = {
    mysql_config,
    redis_config
}
