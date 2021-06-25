const {Error} = require('../model/resModel');

module.exports = (req, res, next) =>{
    const gender = req.body.gender;
    if(gender == 'male' ||gender == 'female' ||gender == 'privacy'){
        next();
        return;
    }
    res.json(new Error('Illegal gender input'));
}