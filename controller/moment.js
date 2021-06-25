const {exec, escape} = require('../database/mysql');

const createMoment = (author, content, createtime) => {

    author = escape(author);
    content = escape(content);
    createtime = escape(createtime);

    const insertMoment = `
        insert into moment(author, content, createtime) values (${author}, ${content}, ${createtime})`
    return exec(insertMoment).then(rows => {
        return rows || {};
    });
}



const getMoments = (author) => {

    author = escape(author);
    const selectOwn = `
    select * FROM moment where author= ${author} order by id DESC`
    //console.log(author);
    return exec(selectOwn).then(rows => {
        return rows || {};
    });

}

const deleteMoment = (id, author) => {
    id = escape(id);
    author = escape(author);

    const prequery = `
    SELECT * FROM moment WHERE id= ${id} AND author= ${author}`
    return exec(prequery).then(rows => {

        const info = rows[0] || {};

        if (info.author) {
            const deleteSelectMoment = `
            DELETE FROM moment WHERE id= ${id} AND author= ${author}`
            return exec(deleteSelectMoment).then(row => {
                return row[0] || {};

            });
        } else {
            //console.log(info.author);
            //console.log(author);
            // input wrong moment id or moment do not belong to the user
            return {
                error: 'Delete failed'
            }
        }
    })
}


const praiseMoment = (id) => {
    id = escape(id);

    const prequery = `
    SELECT praise FROM moment WHERE id= ${id}`
    return exec(prequery).then(rows => {
        const info = rows[0] || {};
        const praise = info.praise + 1;
        const plusPraise = `
        UPDATE moment SET praise= ${praise} WHERE id= ${id}`
        return exec(plusPraise).then(rows => {
            return rows[0] || {};
        })
    })
}


const getSingleMoment = (id) => {

    const selectmomentById = `
    select * FROM moment where id = '${id}'`
    return exec(selectmomentById).then(rows => {
        return rows[0] || {};
    });

}

module.exports = {
    createMoment,
    getMoments,
    getSingleMoment,
    deleteMoment,
    praiseMoment
}