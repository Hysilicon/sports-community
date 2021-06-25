const { exec, escape } = require('../database/mysql')


const login = (username, password) => {

    username = escape(username);
    password = escape(password);

    const login = `
        select username from userlogin where username=${username} and password=${password}
    `
    return exec(login).then(rows => {
        return rows[0] || {};
    });
}

const register = (username, password) => {

    username = escape(username);
    password = escape(password);

    const query = `
    select username from userlogin where username=${username}
    `
    return exec(query).then(rows => {
        const info = rows[0] || {};
        if (info.username) {
            //User already exist
            return {
                error: "user already exists"
            }
        } else {
            const register = `
            insert into userlogin(username, password) values (${username}, ${password})
        `
            return exec(register).then(rows => {
                return rows || {};
            });

        }
    });

}

const getUserInfo = (username) => {

    username = escape(username);

    //Find picture path via username
    const findUserInfo = `
    select  nick, signi, gender, age  FROM userinfo where username=${username}   
        `

    return exec(findUserInfo).then(rows => {
        return rows[0] || {};
    });

}



// Follow SQL queries

const getFollowList = (username) => {

    username = escape(username);

    //Find picture path via username
    const findFollowList = `
    select followedUser FROM userfollow where followUser=${username}   
        `

    return exec(findFollowList).then(rows => {
        return rows || {};
    });

}

const getFollowedList = (username) => {

    username = escape(username);

    //Find picture path via username
    const findFollowedList = `
    select followUser FROM userfollow where followedUser=${username}   
        `

    return exec(findFollowedList).then(rows => {
        return rows || {};
    });

}



const getSingleFollow = (followUser, followedUser) => {


    //Find picture path via username
    const generateSingleFollowRow = `
    select followUser, followedUser FROM userfollow where followUser='${followUser}' and followedUser = '${followedUser}'  
        `

    return exec(generateSingleFollowRow).then(rows => {
        return rows[0] || {};
    });

}

const follow = (followUser, followedUser) => {


    //Find picture path via username
    const generateFollowRow = `
    insert into userfollow(followUser, followedUser) values ('${followUser}', '${followedUser}')
        `

    return exec(generateFollowRow).then(rows => {
        return rows[0] || {};
    });

}

const cancelFollow = (followUser, followedUser) => {


    //Find picture path via username
    const deleteFollowRow = `
    insert into userfollow(followUser, followedUser) values ('${followUser}', '${followedUser}')
        `

    return exec(deleteFollowRow).then(rows => {
        return rows[0] || {};
    });

}









module.exports = {
    login,
    register,
    getUserInfo,
    getFollowList,
    getFollowedList,
    getSingleFollow,
    follow,
    cancelFollow
}