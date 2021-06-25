const {Error} = require('../model/resModel');

module.exports = (req, res, next) =>{
    const title = req.body.title;
    if((title.length)<=40){
        next();
        return;
    }
    res.json(new Error('Invalid title length'));
}