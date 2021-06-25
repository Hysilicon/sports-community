const {Error} = require('../model/resModel');

module.exports = (req, res, next) =>{
    const signi = req.body.signi;
    if((signi.length)<=30){
        next();
        return;
    }
    res.json(new Error('Invalid sign length'));
}