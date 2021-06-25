const mysql = require('mysql');
const {mysql_config} = require('../config/db_config');

let con = mysql.createConnection(mysql_config);
con.connect();

function exec(sql_query){
    const promise = new Promise((resolve, reject)=>{
        con.query(sql_query, (err, result)=>{
            if(err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
    return promise;
}

module.exports = {
    exec,
    escape: mysql.escape
}