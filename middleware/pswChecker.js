const {Error} = require('../model/resModel');

module.exports = (req, res, next) =>{
    const password = req.body.password;
    const username=req.body.username;
    if((password.length)<=16&&(username.length)<=12&&(password.length)>=6){
        next();
        return;
    }
    if(username.length>12) {
        res.json(new Error('Invalid username length'));
    }else{
        res.json(new Error('Invalid password length'));
    }
}