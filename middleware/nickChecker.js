const {Error} = require('../model/resModel');

module.exports = (req, res, next) =>{
    const nick = req.body.nick;
    if((nick.length)>=16){
        next();
        return;
    }
    res.json(new Error('Invalid nickname length'));
}