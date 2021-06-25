const { exec, escape } = require('../database/mysql')


const uploadNick = (username, nick) => {
    username = escape(username);
    nick = escape(nick);
    const preQuery = `
    select username from userinfo where username=${username}`
    return exec(preQuery).then(rows => {
        const info = rows[0] || {}
        if (info.username) {
            const updateNick = `
        update userinfo set nick = ${nick} where username = ${username}`
            return exec(updateNick).then(rows => {
                return rows || {};
            });
        } else {
            const insertNick = `
        insert into userinfo(username, nick) values (${username}, ${nick})`
            return exec(insertNick).then(rows => {
                return rows || {};
            });
        }



    });
}



const uploadSign = (username, signi) => {

    username = escape(username);
    signi = escape(signi);
    const preQuery = `
    select username from userinfo where username=${username}`
    return exec(preQuery).then(rows => {
        const info = rows[0] || {};
        if (info.username) {
            //Update sign
            const updateInfo = `
        update userinfo set signi = ${signi} where username = ${username}
        `
            return exec(updateInfo).then(rows => {
                return rows || {};
            });

        } else {
            //New info
            const insertInfo = `
        insert into userinfo(username, signi) values (${username}, ${signi})
        `
            return exec(insertInfo).then(rows => {
                return rows || {};
            });
        }

    });
}

const uploadAvatar = (username, path) => {

    username = escape(username);
    path = escape(path);
    const preQuery = `
    select username from userinfo where username=${username} 
    `
    return exec(preQuery).then(rows => {
        const info = rows[0] || {};
        if (info.username) {
            //Update avatar
            const updateInfo = `
        update userinfo set path = ${path} where username = ${username}
        `
            return exec(updateInfo).then(rows => {
                return rows || {};
            });

        } else {
            //New info
            const insertInfo = `
        insert into userinfo(username, path) values (${username}, ${path})
        `
            return exec(insertInfo).then(rows => {
                return rows || {};
            });
        }

    });

}
const uploadAge = (username, age) => {
    username = escape(username);
    age = escape(age);
    const preQuery = `
    select username from userinfo where username=${username}`
    return exec(preQuery).then(rows => {
        const info = rows[0] || {}
        if (info.username) {
            const updateAge = `
        update userinfo set age = ${age} where username = ${username}`
            return exec(updateAge).then(rows => {
                return rows || {};
            });
        } else {
            const insertAge = `
        insert into userinfo(username, age) values (${username}, ${age})`
            return exec(insertAge).then(rows => {
                return rows || {};
            });
        }



    });
}


const uploadGender = (username, gender) => {
    username = escape(username);
    gender = escape(gender);
    const preQuery = `
    select username from userinfo where username=${username}`
    return exec(preQuery).then(rows => {
        const info = rows[0] || {}
        if (info.username) {
            const updateGender = `
        update userinfo set gender = ${gender} where username = ${username}`
            return exec(updateGender).then(rows => {
                return rows || {};
            });
        } else {
            const insertGender = `
        insert into userinfo(username, gender) values (${username}, ${gender})`
            return exec(insertGender).then(rows => {
                return rows || {};
            });
        }



    });
}

const updatePassword = (username, oldPassword, newPassword) => {
    username = escape(username);
    newPassword = escape(password);
    const preQuery = `
    select username, password from userlogin where username=${username}`
    return exec(preQuery).then(rows => {
        const info = rows[0] || {}
        if (info.password == oldPassword) {
            const updatePassword = `
        update userlogin set password = ${newPassword} where username = ${username}`
            return exec(updatePassword).then(rows => {
                return rows || {};
            });

        } else {
            return {
                error: 'Invalid password'
            };
        }
    });
}




module.exports = {
    uploadNick,
    uploadSign,
    uploadAvatar,
    uploadGender,
    uploadAge,
    updatePassword
}