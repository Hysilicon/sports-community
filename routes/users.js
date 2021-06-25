var express = require('express');
var fs = require('fs');
var router = express.Router();

const { login,
    register,
    getUserInfo,
    getFollowList,
    getFollowedList,
    getSingleFollow,
    follow,
    cancelFollow } = require('../controller/userscontroller');
const { uploadNick, uploadSign, uploadAvatar, uploadAge, uploadGender, updatePassword } = require('../controller/editcontroller');


const { Success, Error } = require('../model/resModel');
const loginChecker = require('../middleware/loginChecker');
const multer = require('multer');
const pswChecker = require('../middleware/pswChecker');
const signChecker = require('../middleware/signChecker');
const genderChecker = require('../middleware/genderChecker');


var upload = multer({ dest: `./public/images` });


/* GET users listing. */
router.get('/register', function (req, res, next) {

    // res.format({
    //     html: () => {
    //         res.render('register.ejs');
    //     },

    // });
    res.json(new Success('get register URL success'));

});

router.get('/login', function (req, res, next) {

    //res.format({
       // html: () => {
           // res.render('login.ejs');
       // },

    // });



});


router.get('/logout', loginChecker, function (req, res, next) {

    req.session.destroy((err) => {
        if (err) {
            res.json(new Error('Log out failed'));
            return;
        }
        res.clearCookie();
        res.redirect('/users/login');

    })


});


router.get('/my', loginChecker, upload.single("image"), function (req, res, next) {
    const username = req.session.username;
    const resultQuery = getUserInfo(username);
    return resultQuery.then(myData => {

        if (myData) {
            //test
            //console.log(myData.path);
           res.send(myData);

        } else {
            res.json(new Error('Failed'));

        }

    });

});

router.get('/others/:username', loginChecker, upload.single("image"), function (req, res, next) {
    const otherUserName = req.params.username;
    var followStatus = false;
    const resultQuery = getUserInfo(otherUserName);
    return resultQuery.then(userdata => {

        if (userdata) {
            const username = req.session.username;
            const followQuery = getSingleFollow(username, otherUserName);
            followQuery.then(followData => {
                if (followData.followUser) {

                    followStatus = true;
                } else {
                    //Do Nothing
                }

                const otherUserInfo = {
                    otherUserName,
                    image: userdata.path,
                    nick: userdata.nick,
                    signi: userdata.signi,
                    gender: userdata.gender,
                    age: userdata.age,
                    status: followStatus
                }
                res.json(new Success(otherUserInfo, 'Success'));
            });


        } else {

            res.json(new Error('Failed'));

        }
    });

});

// Get follow
router.get('/my/followlist', loginChecker, function (req, res, next) {

    const username = req.session.username;
    const result = getFollowList(username);
    return result.then(data => {
        if (data) {
            res.send(data);
        } else {
            res.json(new Error('Login failed'));
        }
    });

});

router.get('/my/fanlist', loginChecker, function (req, res, next) {

    const username = req.session.username;
    const result = getFollowedList(username);
    return result.then(data => {
        if (data) {
            res.json(new Success(data, 'Get followledist success'));
        } else {
            res.json(new Error('Get followedlist failed'));
        }
    });

});

router.get('/followlist/:username', loginChecker, function (req, res, next) {

    let username = req.params.username;
    const result = getFollowList(username);
    return result.then(data => {
        if (data) {
            res.json(new Success(data, 'Get followlist success'));
        } else {
            res.json(new Error('Get followlist failed'));
        }
    });

});


router.get('/fanlist/:username', loginChecker, function (req, res, next) {

    let username = req.params.username;
    const result = getFollowedList(username);
    return result.then(data => {
        if (data) {
            res.json(new Success(data, 'Get followedlist success'));
        } else {
            res.json(new Error('Get followedlist failed'));
        }
    });

});




// Post 
router.post('/my/avatar', loginChecker, upload.single("image"), function (req, res, next) {
    const username = req.session.username;
    var image = req.file.path;
    const resultQuery = uploadAvatar(username, image);
    return resultQuery.then(data => {
        if (data) {
            res.redirect('/users/my');
            return;
        }
        res.json(new Error('Login failed'));

    });
});

router.post('/login', function (req, res, next) {

    const { username, password } = req.body;
    const resultQuery = login(username, password);
    return resultQuery.then(data => {
        if (data.username) {
            req.session.username = data.username;
            res.send('login success');
            return;
        }
        res.json(new Error('Login failed'));

    });
});

router.post('/register', pswChecker, function (req, res, next) {

    const { username, password } = req.body;
    const resultQuery = register(username, password);
    return resultQuery.then(data => {
        if (!data.error) {
            // req.session.username = data.username;
            // req.session.realname = data.realname;
            res.send("reg success");
            return;
        }
        //console.log(data.error);
        res.json(new Error(data.error));
    });
});



router.post(`/my/nick`, loginChecker, function (req, res, next) {
    const username = req.session.username;
    const { nick } = req.body;
    const result = uploadNick(username, nick);
    return result.then(data => {
        if (data) {
            res.redirect('/users/edit');
            return;
        }
        res.json(new Error(`Nick name upload Failed`));

    });
});

router.post(`/follow/:username`, loginChecker, function (req, res, next) {
    const username = req.session.username;
    const otherUserName = req.params.username;
    const result = follow(username, otherUserName);
    return result.then(data => {
        if (data) {

            res.json(new Success(`Follow successed`));
            return;
        }
        res.json(new Error(`Follow failed`));

    });
});

router.post(`/cancelfollow/:username`, loginChecker, function (req, res, next) {
    const username = req.session.username;
    const otherUserName = req.params.username;
    const result = cancelFollow(username, otherUserName);
    return result.then(data => {
        if (data) {

            res.json(new Success(`Follow canceled`));
            return;
        }
        res.json(new Error(`Cancel failed`));

    });
});


router.post('/my/sign', loginChecker, signChecker, function (req, res, next) {
    const username = req.session.username;
    const { signi } = req.body;
    const resultQuery = uploadSign(username, signi);
    return resultQuery.then(data => {
        if (data) {
            res.redirect('/users/edit');
            return;
        }
        res.json(new Error('Signature uploading failed'));
    });
});


router.post('/my/password', loginChecker, pswChecker, function (req, res, next) {
    const username = req.session.username;
    const { oldPassword, newPassword } = req.body;
    const resultQuery = updatePassword(username, oldPassword, newPassword);
    return resultQuery.then(data => {
        if (!data.error) {
            res.json(new Error('Password update Failed'));
            return;
        }
        //console.log(data.error);
        res.json(new Error(data.error));
    });
});

router.post(`/my/age`, loginChecker, function (req, res, next) {
    const username = req.session.username;
    const { age } = req.body;
    const result = uploadAge(username, age);
    return result.then(data => {
        if (data) {
            res.redirect('/users/edit');
            return;
        }
        res.json(new Error(`Age upload Failed`));

    });
});

router.post(`/my/gender`, genderChecker, loginChecker, function (req, res, next) {
    const username = req.session.username;
    const { gender } = req.body;
    const result = uploadGender(username, gender);
    return result.then(data => {
        if (data) {
            res.redirect('/users/edit');
            return;
        }
        res.json(new Error(`Nick name upload Failed`));

    });
});



module.exports = router;
