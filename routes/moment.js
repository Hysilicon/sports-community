var express = require('express');
var fs = require('fs');
var router = express.Router();

const { createMoment,
    getSingleMoment,
    getMoments,
    deleteMoment,
    praiseMoment
} = require('../controller/moment');

const { Success, Error } = require('../model/resModel');
const loginChecker = require('../middleware/loginChecker');





router.get('/create', loginChecker, function (req, res, next) {

    res.json(new Success('Get create URL success'));

});


router.get('/my', loginChecker, function (req, res, next) {

    const username = req.session.username;
    const resultOwn = getMoments(username);

    return resultOwn.then(data => {
        if (data) {
            res.json(data);
            return;
        }
        res.json(new Error('Failed'));
    });


});

router.get('/:id', loginChecker, function (req, res, next) {

    const id = req.params.id;
    //console.log(id);
    const createResult = getSingleMoment(id);
    //console.log(createResult);
    return createResult.then(article => {
        if (article) {

            res.json(article);

            return;
        }
        res.json(new Error('Failed'));
    });

});

router.post('/create', loginChecker, function (req, res, next) {
    const author = req.session.username;
    const {content} = req.body;
    var now = new Date();
    const createtime = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + (now.getDate()) + '  ' + now.getHours() + ':' + now.getMinutes();
    const createResult = createMoment(author, content, createtime);

    return createResult.then(data => {
        if (data) {
            res.json(new Success('Article has created'));
            return;
        }
        res.json(new Error('Failed'));
    });
});

router.post('/delete/:id', loginChecker, function (req, res, next) {

    const author = req.session.username;
    const id = req.params.id;
    const deleteresult = deleteMoment(id, author);

    return deleteresult.then(data => {
        console.log(data);
        if (data) {
            res.end('Change success');
            return;

        } 
            res.json(new Error(`Failed`));
        
    })
});


router.post('/:id/praise', loginChecker, function (req, res) {
    const id = req.params.id;
    const praise = praiseMoment(id);

    return praise.then(data => {
        if (data) {
            res.json(new Success('Moment has been praised'));
            return;
        }
        res.json(new Error('failed'));
    })

})



module.exports = router;