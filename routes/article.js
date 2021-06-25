var express = require('express');
var fs = require('fs');
var router = express.Router();

const { createArticle,
    getnewestArticle,
    getArticle,
    getOwnArticle,
    deleteArticle,praiseArticle} = require('../controller/article');

const { Success, Error } = require('../model/resModel');
const loginChecker = require('../middleware/loginChecker');
const articleChecker = require('../middleware/articleChecker');


router.get('/square', loginChecker,function (req, res, next) {


    const resultList = getnewestArticle();
    return resultList.then(data => {
        if (data) {
            
            res.format({
                html: () => {
                    res.render('square.ejs', { data });
                },
                json: () => {
                    res.send(data);
               }

            });
            return;
        }
        res.json(new Error('Get articles failed'));
    });

});

router.get('/create', loginChecker,function (req, res, next) {


    res.format({
        html: () => {
            res.render('createArticle.ejs');
        },

    });

});

// Get certain article by article id

router.get('/my',loginChecker,function (req, res, next) {

    const username = req.session.username;

    const resultOwn = getOwnArticle(username);

    return resultOwn.then(data => {
        if (data) {
         res.json(data);
         return;
        }
        res.json(new Error('Failed'));
    });


});

router.post('/create', loginChecker, articleChecker, function (req, res, next) {
    const author = req.session.username;
    const { title, content } = req.body;
    var now = new Date();
    const createtime = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + (now.getDate()) + '  ' + now.getHours() + ':' + now.getMinutes();
    const createResult = createArticle(author, title, content, createtime);

    return createResult.then(data => {
        if (data) {
            res.json(new Success('Article has created'));
            return;
        }
        res.json(new Error('Failed'));
    });
});

router.post('/delete/:id',loginChecker,function (req,res,next) {
    const author=req.session.username;
    const  id=req.params.id;
    const  deleteresult=deleteArticle(id,author);

    return deleteresult.then(data=>{
        console.log(data);
        if(data){
            res.end('Change success');
            return;

        }else{
            res.json(new Error(`Failed`));
        }
    })
});

router.get('/:id', loginChecker,function (req, res, next) {

    const id = req.params.id;
    //console.log(id);
    const createResult = getArticle(id);
    //console.log(createResult);
    return createResult.then(article => {
        if (article) {
            res.format({
                html: () => {
                    res.render('singleArticle.ejs', { article });
                },
                json: () => {
                    res.send(article);
               }

            });
        }
        res.json(new Error('Failed'));
    });

});

router.post('/:id/praise',loginChecker,function (req,res) {
    const id = req.params.id;
    const praise = praiseArticle(id);

    return praise.then(data => {
        if(data){

            res.send(`1`);
            return;
        }
        res.json(new Error('failed'));
    })

})



module.exports = router;