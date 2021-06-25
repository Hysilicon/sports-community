const {Error} = require('../model/resModel');

module.exports = (req, res, next) =>{
    if(req.session.username){
        next();
        return;
    }
    res.json(new Error('User have not log in'));
}